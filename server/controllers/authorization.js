const express = require('express');
const router = require("express").Router();

const {isAuthorized} = require("../services/authorization");

router.get("/isAuthorize",isAuthorized);

module.exports = router;