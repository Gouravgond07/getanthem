const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const EmpMeetRouter = require('./routers/empMeet.router');

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/empMeet', EmpMeetRouter);

app.use((req, res, next) => {
    var err = new Error("Route Not Found");
    // @ts-ignore
    err.status = 500;
    next(err);
});


app.use((err, req, res, next) => {
    res.status(err.status || 200).json({
        success: false,
        // @ts-ignore
        message: err.message || 'Server Error'
    });
})
module.exports = app;