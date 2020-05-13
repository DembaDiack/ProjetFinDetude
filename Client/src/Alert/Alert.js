import React from "react";

const showAlert = (message,type)=>
{
    return (<div
      className={`alert alert-${type}`}
      role="alert"
      style={{ width: "100%", marginTop: 10 }}
    >
      <span>
        <strong>Notification : </strong> {message}.
      </span>
    </div>)
}


export default showAlert;