const express = require('express');
const router = express.Router();


const { Rating } = require("../models/Rating");

const { auth } = require("../middleware/auth");



router.post("/ratingNumber", (req, res) => {

    Rating.find({ "userId": req.body.userId })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)
                // console.log(subscribe[0].rating[0][1])
            res.status(200).json({ success: true, rating: subscribe[0].rating })
        })

});

router.post("/updateRating", (req, res) => {
    // console.log(req.body)

    // const rating = new Rating({
    //     userId: req.body.userId,
    //     rating: [
    //         req.body.movieId,
    //         req.body.rating
    //     ]
    // });

    Rating.find({ "userId": req.body.userId })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)
                // console.log(subscribe[0].rating[0][1])
                // res.status(200).json({ success: true, rating: subscribe[0].rating })
            console.log(subscribe)
            if (subscribe.length) {
                Rating.updateOne({ "userId": "req.body.userId" }, {
                    $push: {
                        "rating": [
                            [req.body.movieId, req.body.rating]
                        ]
                    }
                })
                res.status(200).json({ "success": true })
            }
            res.status(200).json({ "success": false })
        })

    // rating.save((err, doc) => {
    //     if (err) return res.json({ success: false, err })
    //     return res.status(200).json({ success: true })
    // })
})




module.exports = router;