module.exports = function(app) {
    app.use('/api/users', require('./api/user'));
    app.use('/api/referrals', require('./api/referral'));
}
