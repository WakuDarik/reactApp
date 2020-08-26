const Pcg = require('../models').Package

module.exports = {
    async get (req, res) {
        return Pcg
            .findAll()
            .then(contest => {
                res.status(200).send(contest)
            }).catch(err => console.log(err))
    },
    async getOwnerPcg (req, res) {
        try {
            const pcg = await Pcg.findOne({
                where: { id: req.params.id, userId: req.id }
            })

            if (!contest) return res.status(400).json({ error: 'error' })

            return res.status(200).json({ contest: contest })
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}