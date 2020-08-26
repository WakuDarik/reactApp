const Card = require('../models').Card

module.exports = {
    async get (req, res) {
        return Card
            .findAll()
            .then(card => {
                res.status(200).send(card)
            }).catch(err => console.log(err))
    },
    async getOwnerPcg (req, res) {
        try {
            const card = await Card.findOne({
                where: { id: req.params.id, userId: req.id }
            })

            if (!contest) return res.status(400).json({ error: 'error' })

            return res.status(200).json({ contest: contest })
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}