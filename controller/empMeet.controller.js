const EmpMeetService = require('../services/empMeet.service');
const moment = require('moment');

exports.createMeet = async (req, res, next) => {
    try {
        const { date, startDate, endDate } = req.body;
        let nDate = new Date(date);
        nDate = new Date(moment(nDate).format('YYYY-MM-DD'))
        const nStartDate = new Date(moment(nDate).format('YYYY-MM-DD') + ' ' + startDate);
        const nEndDate = new Date(moment(nDate).format('YYYY-MM-DD') + ' ' + endDate);
        const startLimit = new Date(moment(nDate).format('YYYY-MM-DD') + ' ' + '09:00')
        const endLimit = new Date(moment(nDate).format('YYYY-MM-DD') + ' ' + '18:00')
        if (!(nStartDate >= startLimit && nEndDate <= endLimit)) {
            return res.status(400).json({ msg: 'time must be 09:00 to 18:00' })
        }
        const emp = await EmpMeetService.createMeet(nDate, nStartDate, nEndDate);
        res.json(emp)
    } catch (error) {
        next(error);
    }
}

exports.getAvailableSlots = async (req, res, next) => {
    try {
        const { date } = req.params;
        let nDate = new Date(date);
        nDate = new Date(moment(nDate).format('YYYY-MM-DD'))
        const data = await EmpMeetService.getSlots(nDate);
        let mappedData = data.map(x => {
            return {
                data: moment(x.date).format('YYYY-MM-DD'),
                startTime: moment(x.startDate).format('HH:mm'),
                endTime: moment(x.endDate).format('HH:mm')
            }
        })
        res.json(mappedData);
    } catch (error) {
        throw error;
    }
}

exports.reSchedule = async (req, res, next) => {
    try {
        const { meetId, date, startDate, endDate } = req.body;
        let nDate = new Date(date);
        nDate = new Date(moment(nDate).format('YYYY-MM-DD'))
        const nStartDate = new Date(moment(nDate).format('YYYY-MM-DD') + ' ' + startDate);
        const nEndDate = new Date(moment(nDate).format('YYYY-MM-DD') + ' ' + endDate);
        const startLimit = new Date(moment(nDate).format('YYYY-MM-DD') + ' ' + '09:00')
        const endLimit = new Date(moment(nDate).format('YYYY-MM-DD') + ' ' + '18:00')
        if (!(nStartDate >= startLimit && nEndDate <= endLimit)) {
            return res.status(400).json({ msg: 'time must be 09:00 to 18:00' })
        }
        const emp = await EmpMeetService.reSchedule(meetId, nDate, nStartDate, nEndDate);
        res.json(emp)
    } catch (error) {
        next(error);
    }
}

exports.cancelMeet = async (req, res, next) => {
    try {
        const { meetId } = req.params;
        const emp = await EmpMeetService.cancelMeet(meetId);
        res.json(emp)
    } catch (error) {
        next(error);
    }
}