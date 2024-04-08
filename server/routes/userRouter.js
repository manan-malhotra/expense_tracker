const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.get("/", (req, res) => {
    res.send("I am alive");
});
router.post("/register", registerUser).post("/login", loginUser);

module.exports = router;
