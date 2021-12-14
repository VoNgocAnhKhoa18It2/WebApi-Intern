const db = require('mongoose');
const Login= db.model('login', {
	id: String, 
    birth: Date,
	email: String,
    password: String,
});

module.exports = Login;