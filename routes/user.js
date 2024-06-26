const router = require("express").Router();
const { query } = require("../database/dbpromise.js");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");
const { isValidEmail } = require("../functions/function.js");
const { sign } = require("jsonwebtoken");
const moment = require("moment");

// aignup user
router.post("/signup", async (req, res) => {
  try {
    const { email, name, password, country_code, mobile_number, acceptPolicy } =
      req.body;

    if (!email || !name || !password || !country_code || !mobile_number) {
      return res.json({
        msg: "Please fill the details",
        success: false,
        code: 201,
      });
    }

    if (!acceptPolicy) {
      return res.json({
        msg: "You did not click on checkbox of Privacy & Terms",
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
    const findEx = await query(
      `SELECT email,country_code,mobile_number FROM "user" WHERE email = $1 OR (country_code = $2 AND mobile_number = $3)`,
      [email, country_code, mobile_number]
    );
    if (findEx.length > 0) {
      if (
        findEx[0].email == email &&
        findEx[0].mobile_number == mobile_number
      ) {
        return res.json({
          msg: "User already exist with this Email & Mobile Number",
          success: false,
          code: 201,
        });
      } else if (findEx[0].email == email) {
        return res.json({
          msg: "User already exist with this Email",
          success: false,
          code: 201,
        });
      } else {
        return res.json({
          msg: "User already exist with this Mobile Number",
          success: false,
          code: 201,
        });
      }
    }

    const haspass = await bcrypt.hash(password, 10);
    const uid = randomstring.generate();

    await query(
      `INSERT INTO "user" (name, uid, email, password, country_code, mobile_number) VALUES ($1,$2,$3,$4,$5,$6)`,
      [name, uid, email, haspass, country_code, mobile_number]
    );

    res.json({ msg: "Signup Success", success: true, code: 200 });
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err, code: 500 });
    console.log(err);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        msg: "Please provide email and password",
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

    // check for user
    const userFind = await query(`SELECT * FROM "user" WHERE email = $1`, [
      email,
    ]);
    if (userFind.length < 1) {
      return res.json({
        success: false,
        msg: "Invalid credentials",
        code: 201,
      });
    }

    const compare = await bcrypt.compare(password, userFind[0].password);

    if (!compare) {
      return res.json({
        success: false,
        msg: "Invalid credentials",
        code: 201,
      });
    } else {
      const token = sign(
        {
          uid: userFind[0].uid,
          role: "user",
          country_code: userFind[0].country_code,
          mobile_number: userFind[0].mobile_number,
          email: userFind[0].email,
        },
        process.env.JWTKEY,
        {}
      );
      res.json({
        success: true,
        token,
        role: "user",
        code: 200,
      });
    }
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err, code: 201 });
    console.log(err);
  }
});

module.exports = router;
