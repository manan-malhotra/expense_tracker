const router = require("express").Router();
const { addIncome } = require("../controllers/incomeController");

router.get("/", (req, res) => {
    res.send("I am alive");
});

router.post("/addIncome", addIncome);

module.exports = router;
