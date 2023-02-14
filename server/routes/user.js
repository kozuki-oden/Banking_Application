const express = require("express");
const { signup, reqSignin, signin } = require("../controllers/user");
const router = express.Router();
const { validateRequest, isRequestValidated } = require("../validators/auth");
const {
  createAccount,
  withdraw,
  recharge,
  transferMoney,
  getUserAccounts,
} = require("../controllers/account");
const { getTransactions } = require("../controllers/transactions");

//signup: A POST route that validates the incoming request body using the validateRequest and isRequestValidated functions, and then calls the signup controller function to create a new user account.
router.post("/signup", validateRequest, isRequestValidated, signup);
router.post("/signin", signin);
router.post("/createAccount", createAccount);

//withdraw: A POST route that withdraws an amount from the user's account by calling the withdraw controller function. The route requires the user to be authenticated using the reqSignin function.
router.post("/withdraw", reqSignin, withdraw);
router.post("/recharge", reqSignin, recharge);
router.post("/transfer", reqSignin, transferMoney);
router.get("/userAccounts", reqSignin, getUserAccounts);
router.get("/transactions", reqSignin, getTransactions);

module.exports = router;
