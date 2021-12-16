const db = require('mongoose');
const Login= db.model('login', {
	id: String, 
    birth: String,
	email: String,
    password: String,
});

module.exports = Login;