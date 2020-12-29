const express = require("express");
const { check } = require("express-validator");

const contactMeController = require("../controllers/contact-controller");

const router = express.Router();

router.post(
  "/",
  [
    check("sender")
      .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)
      .not()
      .isEmpty(),
    check("title").not().isEmpty(),
    check("messageBody").not().isEmpty(),
  ],
  contactMeController.postContactMe
);

module.exports = router;

//messageBody, title, sender
