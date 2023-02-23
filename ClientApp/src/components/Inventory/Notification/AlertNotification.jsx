import React from "react";
import { Alert} from "reactstrap";

function AlertNotification(props) {
  return (
    <div style={{ position: "absolute", bottom: 0, right: 20, zIndex: 999 }}>
      <Alert
        color="danger"
        className="alert-with-icon"
        isOpen={props.notifVisible}
        toggle={props.onDismiss}
      >
        <span data-notify="icon"></span>
        <span data-notify="message">Low stocks for [insert product here]</span>
      </Alert>
    </div>
  );
}

export default AlertNotification;
