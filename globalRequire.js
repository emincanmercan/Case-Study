global.express = require("express");
global.errFunc = function (res, errMessage) {
    return res.status(500).json({ message: errMessage });
}