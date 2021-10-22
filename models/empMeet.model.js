const db = require("../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * @typedef {Object} IEmpMeetSchema
 * @property {String} _id
 * @property {Date} date
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {Date} [createdAt]
 * @property {Date} [updatedAt]
 */
const EmpMeetSchema = new Schema(
    {
        date: {
            type: Date
        },
        startDate: {
            type: Date 
        },
        endDate: {
            type: Date
        }
    },
  { timestamps: true }
);

/** @typedef  {IEmpMeetSchema & mongoose.Document} EmpMeetDocument*/
/** @type {mongoose.Model<EmpMeetDocument>} */
// @ts-ignore
const EmpMeetModel = db.model("EmpMeet", EmpMeetSchema);
module.exports = EmpMeetModel;
