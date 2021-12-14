const express = require('express');

const api = require("../controllers/api.controller");

const router = express.Router();

router.post("/login", api.login)
router.post('/join',api.join)
router.get('/get-magic',api.getMagic)
router.post('/check-id',api.checkId)

module.exports = router;