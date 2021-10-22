const express = require('express');
const router = express.Router();
const EmpMeetController = require('../controller/empMeet.controller');

router.post('/createMeet', EmpMeetController.createMeet);

router.get('/availableSlots/:date', EmpMeetController.getAvailableSlots);

router.post('/reSchedule', EmpMeetController.reSchedule);

router.delete('/cancelMeet/:meetId', EmpMeetController.cancelMeet);

module.exports = router;