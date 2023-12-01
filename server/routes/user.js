const express = require('express')
const router = express.Router()

router.get("/user", (req, res)=>{
    res.json({
        data: "yo user"
    })
})

module.exports = router