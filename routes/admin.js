const router = require("express").Router();
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const moment = require("moment");
const { isValidEmail } = require("../functions/function.js");
const { query } = require("../database/dbpromise.js");

router.post("/addAdmin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        msg: "Please fill the details",
        success: false,
        code: 201,
      });
    }

    if (!isValidEmail(email)) {
      return res.json({
        msg: "Please enter a valid email",
        success: false,
        code: 201,
      });
    }

    // check if user already has same email
    const findEx = await query(`SELECT * FROM admin WHERE email = $1`, [email]);
    if (findEx.length > 0) {
      return res.json({
        msg: "A user already exist with this email",
        success: false,
        code: 201,
      });
    }

    const haspass = await bcrypt.hash(password, 10);
    const uid = randomstring.generate();

    await query(`INSERT INTO admin (uid, email, password) VALUES ($1,$2,$3)`, [
      uid,
      email,
      haspass,
    ]);

    res.json({ msg: "Signup Success", success: true, code: 200 });
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err, code: 500 });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        msg: "Kindly input your email and password",
      });
    }
    // check for user
    const userFind = await query(`SELECT * FROM admin WHERE email = $1`, [
      email,
    ]);
    if (userFind.length < 1) {
      return res.json({
        msg: "Invalid credentials",
        success: false,
        code: 201,
      });
    }

    const compare = await bcrypt.compare(password, userFind[0].password);
    if (!compare) {
      return res.json({
        msg: "Invalid credentials",
        success: false,
        code: 201,
      });
    } else {
      const token = sign(
        { uid: userFind[0].uid, role: "admin", email: userFind[0].email },
        process.env.JWTKEY,
        {}
      );
      res.json({
        success: true,
        token,
        code: 200,
        role: "admin",
      });
    }
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err, code: 500 });
    console.log(err);
  }
});

module.exports = router;
