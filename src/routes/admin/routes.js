const express = require("express");
const usersRoute = require("./users.routes");
const salesRoute = require("./sales.routes");
const fruitsVegetablesRoute = require("./fruits_vegetables.routes");
const User = require("../../models/user.model");

const router = express.Router();

router.use("/users", usersRoute);
router.use("/sales", salesRoute);
router.use("/fruits_vegetables", fruitsVegetablesRoute);

router.get("/dashboard", async (req, res) => {
  const user = await User.getById(req.user.id);
  const data = await user.getDashboardData();
  return res.json({ ok: true, data });
});

module.exports = router;
