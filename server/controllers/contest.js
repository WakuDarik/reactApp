const { sequelize } = require('../models')

const Contest = require('../models').Contest

module.exports = {

  async create (req, res) {
    try {
      transaction = await sequelize.transaction()

      req.body.data.typeName.trim()
      typeContest = req.body.data.typeName.split('+')
      for (let i = 0; i < typeContest.length; i++) {
        typeContest[i] = typeContest[i].trim()
      }
      req.body.data.typeName = typeContest[0]

      newContest = await Contest.create(req.body.data, { transaction })


      let index = typeContest.indexOf(req.body.data.typeName.toLowerCase());
      if (index > -1) {
        typeContest.splice(index, 1);
      }

      let contestInPcgData = []
      if (typeContest.length >= 1) {
        for (let i = 0; i < typeContest.length; i++) {
          contestInPcgData[i] = {
            typeName: typeContest[i],
            userId: req.body.data.userId,
            createdAt: Date.now(),
            updatedAt: Date.now()
          }
        }

        const createPcgContest = await Contest.bulkCreate(contestInPcgData, { transaction })

        if (createPcgContest)
          transaction.commit()
        return res.status(200).json({
          status: 200,
          contest: newContest,
          createPcgContest: createPcgContest
        })
      }

      transaction.commit()
      return res.status(200).json({
        status: 200,
        contest: req.body.data
      })
    } catch (e) {
      transaction.rollback()
      return res.status(400).json({
        status: 400,
        error: e.message,
        name: e.name,
        asd: req.body.typeName
      })
    }
  },

  allContest (req, res) {
    return Contest
      .findAll()
      .then(contest => {
        res.status(200).send(contest)
      }).catch(err => console.log(err))
  },

  async ownerContestById (req, res) {
    try {
      const contest = await Contest.findOne({
        where: { id: req.params.id, userId: req.id }
      })

      if (!contest) return res.status(400).json({ error: 'error' })

      return res.status(200).json({ contest: contest })
    } catch (error) {
      return res.status(400).send(error)
    }
  },




}