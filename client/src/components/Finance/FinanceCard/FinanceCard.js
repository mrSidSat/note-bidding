/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiStepForm from "../../MultiStepForm/MultiStepForm";
import useStyles from "./styles";
import {
  approvePendingRequestsFinance,
  rejectPendingRequestsFinance,
  sendBackPendingRequestsFinance,
} from "../../../actions/financeActions";
import CommentSection from "../CommentSection/CommentSection";

export default function FinanceCard({ draft }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const request = {
    id: draft._id,
  };
  const userFinance = JSON.parse(localStorage.getItem("fin_profile"));
  let flag = false;
  if (draft.status !== "approvedByFaculty") {
    flag = true;
  }
  const downloadPdf = () => {
    const linkSource = `${draft.pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "Event.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleApprove = (e) => {
    e.preventDefault();
    console.log(userFinance.financeID);

    dispatch(
      approvePendingRequestsFinance(userFinance.financeID, request, history)
    );
  };

  const handleReject = () => {
    dispatch(
      rejectPendingRequestsFinance(userFinance.financeID, request, history)
    );
  };

  const handleSendBack = () => {
    dispatch(
      sendBackPendingRequestsFinance(userFinance.financeID, request, history)
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let flag2 = false;
  if (draft.status.includes("rejected")) {
    flag2 = true;
  }
  let textcolor = "green";
  if (flag2) {
    textcolor = "red";
  }
  let bgColor = "#ADEECF";
  if (flag2) {
    bgColor = "#FDD2BF";
  }
  const stat = draft.status.split("By");

  const progress = function (status) {
    switch (status) {
      case "sentByClub":
        return 1;
      case "approvedByFaculty":
        return 2;
      case "approvedByFinance":
        return 3;
      case "approvedByDean":
        return 4;
      default:
        return null;
    }
  };
  return (
    <div
      className="border border-dark rounded"
      style={{
        paddingLeft: "2rem",
        paddingTop: "1rem",
        paddingRight: "2rem",
        paddingBottom: "1rem",
        backgroundColor: `${bgColor}`,
        marginBottom: "1rem",
      }}
    >
      <p style={{ marginBottom: "5px", fontWeight: "500", color: "#423F3E" }}>
        {draft.clubName}
      </p>
      <h1 style={{ fontWeight: "700", marginBottom: "0" }}>
        {draft.eventName}
      </h1>
      <div className="d-flex">
        <div style={{ fontWeight: "400" }}>
          <p
            className=""
            style={{
              textDecoration: "none",
              marginTop: "5px",
              marginBottom: "5px",
              color: "black",
            }}
          >
            {draft.eventDate?.split("T")[0]}
          </p>
          <p
            className=""
            style={{
              marginTop: "5px",
              marginBottom: "15px",
              textDecoration: "none",
              color: "black",
            }}
          >
            {draft.eventDescription}
          </p>
        </div>
        <div
          className=""
          style={{
            marginLeft: "auto",
            textAlign: "center",
            fontWeight: "600",
            color: `${textcolor}`,
          }}
        >
          <div style={{ color: "#423F3E" }}>status</div>
          {`${stat[0][0].toUpperCase()}${stat[0].slice(1)} By ${stat[1]}`}
        </div>
      </div>
      <div>
        <CardActions style={{ padding: "0" }}>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary"
            onClick={downloadPdf}
            style={{ marginLeft: "0" }}
          >
            Download Pdf
          </Button>
          <Button
            className={classes.button}
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleOpen}
            style={{ marginLeft: "0" }}
          >
            Write a Comment
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Comments"}</DialogTitle>
            <DialogActions>
              <CommentSection draft={draft} />
            </DialogActions>
          </Dialog>
        </CardActions>
        {!flag ? (
          <>
            <Typography style={{ padding: "0", marginBottom: "8px" }}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
                style={{ paddingLeft: "0" }}
              />
              checking following I agree to give concent for that event.
            </Typography>
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="primary"
              disabled={!checked}
              onClick={handleApprove}
              style={{ marginLeft: "0" }}
            >
              Approve
            </Button>

            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleSendBack}
              style={{ marginLeft: "0" }}
            >
              Send Back for Correction
            </Button>
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleReject}
              style={{ marginLeft: "0" }}
            >
              Reject
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
