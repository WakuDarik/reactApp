const express = require('express')
const checkToken = require('../utils/checkToken')

const UserCtrl = require('../controllers').user
const ContestCtrl = require('../controllers').contest
const PcgCtrl = require('../controllers').pcg
const CardCtrl = require('../controllers').card

const router = express.Router()

// router.post('/user', UserCtrl.createUser)
// router.put('/user/:id', UserCtrl.updateUser)
router.get('/user/:id', UserCtrl.getUsersById)
router.get('/users', UserCtrl.getUsers)
router.get('/usercontest/:id', UserCtrl.allContest)
router.get('/current-user', checkToken, UserCtrl.getCurrentUser)
router.post('/login', UserCtrl.signupUser)
router.post('/user', UserCtrl.create)
router.post('/pay', checkToken, UserCtrl.payContest)


router.get('/contest', ContestCtrl.allContest)
router.post('/contest', ContestCtrl.create)
router.get('/curentcontest/:id', checkToken, ContestCtrl.ownerContestById)
router.get('/activecontest/:id', checkToken, UserCtrl.activeContest)

router.get('/pcg', PcgCtrl.get)

router.get('/card', CardCtrl.get)


module.exports = router