module.exports = (app) => {

    const authRouter = require('./Routes/authRoute');
    const setMeetingRouter = require('./Routes/setMeetingRoute');
    const houseRouter = require('./Routes/houseRoute');
    const membersRouter = require('./Routes/membersRoute');
    const mantainanceRouter = require('./Routes/mantainanceRoute');
    const memberFeedRouter = require('./Routes/memberFeedRoute');
    const getPaymentDetailsRouter = require('./Routes/getPaymentDetails');

    app.use('/auth', authRouter);
    app.use('/setMeetings', setMeetingRouter);
    app.use('/house', houseRouter );
    app.use('/members', membersRouter );
    app.use('/mantainance', mantainanceRouter );
    app.use('/member', memberFeedRouter );
    app.use('/getPaymentDetails', getPaymentDetailsRouter );
};