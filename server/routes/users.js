const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        rating: req.user.rating,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});



//  Get a user from their user id
router.get("/:userID", async(req, res) => {
    const { userID } = req.params;
    console.log("user id =><<<<<<<<<>>> ", userID)
    const user = await User.findOne({ _id: userID })
        // console.log("User =<<<<<<<<<<.", user)
    console.log("user=", user.ratings)
    res.status(200).send(user.ratings)
})


router.post("/update", async(req, res) => {
    console.log("i made it to the correct  update function")
    try {
        const { userID, updateField, updatedValues } = req.body;



        User.findByIdAndUpdate(userID, { ratings: updatedValues }, (err, doc) => {
            if (err) {
                console.error(err)
            } else {
                console.log("doc = ", doc)
                doc.ratings = updatedValues
                doc.save()
                res.json(doc)

            }
        })
    } catch (err) {
        console.log("some error in the catch block on the update user route in the user router file")
        console.error(err.message)
        res.status(500).json("server error ")
    }
})


module.exports = router;