const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sequelize } = require('../models')

const User = require('../models').User
const Contest = require('../models').Contest
const Pcg = require('../models').Package
const Card = require('../models').Card


module.exports = {

    async create (req, res) {

        const { name, accType, email, password } = req.body.data

        try {
            let user = await User.findOne({ where: { email: email } })

            if (user) return res.status(401).json({
                status: 401,
                msg: 'user is exist alredy'
            })

            if (!user) {
                req.body.data.password = await bcrypt.hash(password, await bcrypt.genSalt(8))
                newUser = await User.create(req.body.data)
            }

            const token = await jwt.sign({ id: newUser.id }, 'secret', { expiresIn: '1h' })

            return res.send({
                token,
                user: newUser
            });


        } catch (error) {
            return res.status(400).send(error)
        }
    },

    allContest (req, res) {

        return User.findByPk(req.params.id, { include: ["contests"] })
            .then((user) => {
                return res.status(200).json({
                    status: 200,
                    user: user
                })
            })
            .catch((error) => {
                return res.status(400).send(error)
            });
    },

    oneContest (req, res) {
        return User.findByPk(req.params.id, {
            include: [{ model: Contest }],
        })
            .then((user) => {
                return res.status(200).json({
                    status: 200,
                    user: user
                })
            })
            .catch((error) => {
                return res.status(400).send(error)
            });

    },
    getUsers (req, res) {
        return User
            .findAll()
            .then(users => {
                res.status(200).send(users)
            }).catch(err => console.log(err))

    },

    getUsersById (req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user)
                    return res.status(400).json({
                        status: 400,
                        message: "User Not Exist"
                    });
                res.status(200).send(user)
            }).catch(err => console.log(err))

    },

    async signupUser (req, res) {
        try {
            const { email, password } = req.body.data
            const user = await User.findOne({ where: { email: email } })

            if (!user) return res.status(400).json({
                status: 400,
                message: "User Not Exist"
            })

            const isSamePasswords = await bcrypt.compare(password, user.password)

            if (!isSamePasswords) {
                return res.status(400).json({
                    status: 400,
                    message: "password wrong"
                })
            }

            const newToken = await jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' })
            res.send({ token: newToken, user })
        } catch (err) { console.log(err) }
    },

    async getCurrentUser (req, res) {
        try {
            const user = await User.findOne(
                {
                    where: { id: req.id },
                    attributes: { exclude: ['password'] },
                }
            )

            if (!user) {
                return res.status(400).json({
                    status: 400,
                    message: "password wrong"
                })
            }

            return res.status(200).json({
                user: user,
            })
        } catch (err) {
            return res.status(400).json({
                status: 400,
                message: 'some error'
            })
        }
    },

    async payContest (req, res) {
        try {
            const { card, cvv, price, pcg } = req.body.data
            transaction = await sequelize.transaction();
            const manyTransfer = await Card.update(
                {
                    balance: sequelize.literal(`balance - ${price}`),
                },
                {
                    where: { card: card, cvv: cvv, userId: req.id },
                    returning: true,
                    transaction
                }
            )



            if (manyTransfer[1] === 0) {

                transaction.rollback()
                return res.status(400).json({
                    status: 400,
                    message: 'feild transfer money operation'
                })
            }

            pcgsData = []
            pcgs = pcg.split(',');
            for (var i = 0; i < pcgs.length; ++i)
                pcgsData[i] = {
                    pcg: pcgs[i],
                    isUse: 0,
                    userId: req.id,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                }

            //bulkCreate
            const createPcg = await Pcg.bulkCreate(
                pcgsData,
                {
                    transaction
                }
            )
            // if (!moneyTransfer || !contest) {
            //     await t.rollback();
            //     return res.status(400).json({
            //         status: 400,
            //         message: 'error in transaction'
            //     })
            // }
            if (createPcg)
                transaction.commit()

            return res.status(200).json({
                status: 200,
                manyTransfer: createPcg

            })

        } catch (err) {
            transaction.rollback()
            return res.status(400).json({
                status: 400,
                message: err
            })
        }
    },

    async activeContest (req, res) {



        try {

            transaction = await sequelize.transaction()

            const contest = await Contest.findOne({ where: { id: req.params.id, userId: req.id, activity: 0 }, transaction })

            const inPcg = await Pcg.findOne({
                where: { pcg: contest.typeName, userId: req.id, isUse: 0 },
                transaction
            })

            if (!contest) {
                throw new ContestError("you have no exist contest");

            }

            if (!inPcg) {
                throw new PcgError("you have no payed pcg")

            }

            const updateContest = await contest.update(
                { activity: 1 },
                { transaction }
            )

            const updatePcg = await inPcg.update(
                { isUse: 1 },
                { transaction }
            )

            if (!updatePcg || !updateContest)
                transaction.rollback()

            transaction.commit()
            return res.status(200).json({
                status: 200,
                typeName: inPcg

            })
        } catch (e) {
            transaction.rollback()
            if (e.name === "TypeError") {
                return res.status(400).json({
                    status: 400,
                    message: 'you have no exist contest',
                    name: e.name

                })
            } else if (e.name == "PcgError") {
                return res.status(400).json({
                    status: 400,
                    message: e.message,
                    name: e.name
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: e.message,
                    name: e.name
                })
            }

        }
    }

}