var mongoose = require('mongoose');

var ReferralSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true
	},
	users: [String],
	userId: {
		type: String,
		required: true
	},
	createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Referral', ReferralSchema);
