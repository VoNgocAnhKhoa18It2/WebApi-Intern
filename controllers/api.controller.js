const Login = require('../models/login.model')
const fs = require('fs');

const swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  };

module.exports = {
    login: async(req, res) => {
        const loginReq = req.body;
        const data = {
            successful: false,
            messages: '',
        }
        try {
            let user = await Login.findOne({id: loginReq.id});
            if (!user) {
                data.messages = "Login Failed. ID Don't Exists"
                return res.json(data)
            }

            if (user.password != req.body.password) {
                data.messages = 'Incorrect Password'
                return res.json(data)
            }
            data.successful = true
            data.messages = 'Login Successful'
            data.data = user
            res.json(data)
        } catch (err) {
            data.messages = err.message
            return res.json(data)
        }
    },
    join: async(req, res) => {
        const joinReq = req.body;
        const data = {
            successful: false,
            messages: '',
        }
        try {
            const checkId = await Login.findOne({id: joinReq.id});
            if (checkId) {
                data.messages = 'Join Failed. ID Already Exists'
                return res.json(data);
            }

            const add = await new Login(joinReq).save()
            if(add) {
                successful: true,
                data.messages = 'Join Successful'
            } else {
                data.messages = 'Join Failed'
            }

            return res.json(data)
        } catch (err) {
            data.messages = err.message
            return res.json(data)
        }
    },
    getMagic: async(req, res) => {
        const urlMagic = "./public/magic"
        const data = {
            successful: false,
            messages: '',
        }
        fs.readdir(urlMagic, (err, files) => {
            if (err) {
                data.messages = err.message
                return res.json(data)
            };
            for(var i = 0; i < files.length/2; i++) {
                var j = Math.floor(Math.random() * (files.length+1));
                if (!files[j]) j = Math.floor(Math.random() * (files.length+1));
                var k = Math.floor(Math.random() * (files.length+1));
                if (!files[k]) k = Math.floor(Math.random() * (files.length+1));
                swapArrayElements(files,k,j);
            }
            data.successful = true
            data.data = files
            return res.json(data)
        });
    },

    checkId: async(req, res) => {
        const id = req.body.id;
        const data = {
            successful: true,
            messages: '',
        }
        try {
            const checkId = await Login.findOne({id: id});
            if (checkId) {
                data.successful = false,
                data.messages = 'ID Already Exists'
            } else {
                data.messages = 'Valid ID'
            }

            return res.json(data)
        } catch (err) {
            data.successful = false,
            data.messages = err.message
            return res.json(data)
        }
    }
}