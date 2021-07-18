const express = require("express");
const financeController = require("./../controller/financeController");
const { isFinanceLoggedIn } = require("./../controller/authController");
const financeHead = require("../models/financeHead");
const router = express.Router();
const bcrypt = require("bcryptjs");
//router.param('id', testController.checkId);

//buttons on request = reject, approve, send back, add comments
//buttons on dashboard = Finance details, Pending Requests, Responded Requests
// router.post("/register", async function (req, res) {
//   const {
//     username,
//     password,
//     financeName,
//     financeEmail,
//     financeContact,
//     financePic,
//     financeDesignation,
//   } = req.body;
//   const p = await bcrypt.hash(password, 12);
//   const newFinance = new financeHead({
//     username,
//     password: p,
//     financeName,
//     financeEmail,
//     financeContact,
//     financePic,
//     financeDesignation,
//   });
//   await newFinance.save();
//   res.send("Successfully registered");
// });
router
  .route("/login")
  .get(financeController.login)
  .post(financeController.authentication);

router.route("/").get(isFinanceLoggedIn, financeController.dashboard);

router
  .route("/:id/details")
  .get(financeController.getDetailsById) // 'Finance Details' button on dashboard
  .patch(financeController.updateDetailsById); // 'Update' button on finance details page

router
  .route("/changePassword")
  .get(isFinanceLoggedIn, financeController.changePassword)
  .patch(isFinanceLoggedIn, financeController.authorise);

router
  .route("/pendingRequests")
  .get(isFinanceLoggedIn, financeController.getPendingRequests) // 'Pending Requests' button on dashboard
  .patch(isFinanceLoggedIn, financeController.sendBackPendingRequest) // 'Send back' button on request (after adding comments)
  .post(isFinanceLoggedIn, financeController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(isFinanceLoggedIn, financeController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/respondedRequests")
  .get(isFinanceLoggedIn, financeController.getRespondedRequests); // 'Responded Requests' button on dashboard
//  .delete(financeController.deleteSentRequests);

router.route("/logout").get(isFinanceLoggedIn, financeController.logout);

module.exports = router;
