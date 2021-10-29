const EmpMeet = require('../models/empMeet.model');
const moment = require('moment');
class EmpMeetService {
    /**
     * @param {Date} date
     * @param {Date} startTime
     * @param {Date} endTime
     * @return {Promise<Boolean>}
     */
    static async validDateMeet(date, startTime, endTime) {
        try {
            const data = await EmpMeet.findOne({ date }).or([
                { $and: [{ startDate: { $gte: startTime } }, { endDate: { $lte: startTime } }] },
                { $and: [{ startDate: { $lte: startTime } }, { endDate: { $lte: endTime } }] },
                { $and: [{ startDate: { $gte: startTime } }, { endDate: { $gte: endTime } }] }
            ]);


            if (data) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }

    }
    /**
     * 
     * @param {String} meetId 
     * @param {Date} date 
     * @param {Date} startTime 
     * @param {Date} endTime 
     * @return {Promise<Boolean>}
     */
    static async validateForReschedule(meetId, date, startTime, endTime) {
        try {
            const data = await EmpMeet.findOne({ date, _id: { $ne: meetId } }).or([
                { $and: [{ startDate: { $gte: startTime } }, { endDate: { $lte: startTime } }] },
                { $and: [{ startDate: { $lte: startTime } }, { endDate: { $lte: endTime } }] },
                { $and: [{ startDate: { $gte: startTime } }, { endDate: { $gte: endTime } }] }
            ]);
            if (data) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {Date} date 
     * @param {Date} startTime 
     * @param {Date} endTime
     * @return {Promise<import('../models/empMeet.model').IEmpMeetSchema>}  
     */
    static async createMeet(date, startTime, endTime) {
        try {
            const validate = await this.validDateMeet(date, startTime, endTime);
            if (validate === false) {
                throw new Error('Meet already assigned');
            }
            const empMeet = new EmpMeet({ date, startDate: startTime, endDate: endTime });
            return await empMeet.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {Date} date 
     * @return {Promise<import('../models/empMeet.model').IEmpMeetSchema[]>}
     */
    static async getSlots(date) {
        try {
            const data = EmpMeet.find({ date });
            return data;
        } catch (error) {
            throw error;
        }
    }


    /**
     * 
     * @param {String} meetId 
     * @param {Date} date 
     * @param {Date} startTime 
     * @param {Date} endTime
     * @return {Promise<import('../models/empMeet.model').IEmpMeetSchema>}  
     */
    static async reSchedule(meetId, date, startTime, endTime) {
        try {
            const validate = await this.validateForReschedule(meetId, date, startTime, endTime);
            if (validate === false) {
                throw new Error('Can not reSchedule, this slot already exist');
            }
            await EmpMeet.findByIdAndDelete(meetId);
            const empMeet = new EmpMeet({ date, startDate: startTime, endDate: endTime });
            return await empMeet.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {String} meetId 
     * @return {Promise<import('../models/empMeet.model').IEmpMeetSchema>}  
     */
    static async cancelMeet(meetId) {
        try {
            const meet = await EmpMeet.findById(meetId);
            if (!meet) {
                throw new Error('meet does not exist');
            }
            const currentDate = new Date();
            if (meet.startDate < currentDate) {
                throw new Error('Can not cancel the meet');
            }
            const deleted = await EmpMeet.findByIdAndDelete(meetId);
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmpMeetService;