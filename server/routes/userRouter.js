const router = require("express").Router();
const {
    registerUser,
    loginUser,
    getProfile,
    logout,
} = require("../controllers/userController");

router.get("/", (req, res) => {
    res.send("I am alive");
});
router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/profile", getProfile)
    .get("/logout", logout);

module.exports = router;
