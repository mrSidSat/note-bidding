const express = require("express");
const facultyController = require("./../controller/facultyController");
const facAuth = require('../middleware/facultyAuth.js')
const router = express.Router();

//buttons on request = reject, approve, send back, add comments
//buttons on dashboard = Faculty details, Pending Requests, Responded Requests

router
  .route("/login")
  .post(facultyController.authentication);

router
  .route("/:id/details")
  .get(facAuth,facultyController.getDetailsById) // 'Faculty Details' button on dashboard
  .patch(facAuth,facultyController.updateDetailsById); // 'Update' button on faculty details page

router
  .route("/:id/changePassword")
  .patch(facAuth, facultyController.authorise);

router
  .route("/:id/pendingRequests")
  .get(facAuth, facultyController.getPendingRequests) // 'Pending Requests' button on dashboard
  .patch(facAuth, facultyController.sendBackPendingRequest) // 'Send back' button on request (after adding comments)
  .post(facAuth, facultyController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(facAuth, facultyController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(facAuth, facultyController.getRespondedRequests); // 'Responded Requests' button on dashboard
//  .delete(facultyController.deleteSentRequests);

module.exports = router;
