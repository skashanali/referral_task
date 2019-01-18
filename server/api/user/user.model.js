var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone_number: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		set: pwd => bcrypt.hashSync(pwd, 10)
	},
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
