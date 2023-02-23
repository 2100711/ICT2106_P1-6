import React from "react";
import { useState } from "react";
import AlertNotification from "./Notification/AlertNotification";
import { Table } from "reactstrap";

function InventoryDashboard(props) {
  const [notifVisible, setnotifVisible] = useState(true);
  function onDismiss() {
    setnotifVisible(!notifVisible);
  }
  const thArray1 = ["ProductID", "Name", "Stock"];
  const thArray2 = ["ProductID", "Name", "Stock sold"];
  const tdArray1 = [
    ["1", "All-Purpose Heavy Duty Degreaser", "10"],
    ["2", "Floor Cleaner - Lemongrass & Green Tea", "20"],
    ["3", "Floor Cleaner Fresh Lemon - 3L", "30",]
  ];
  const tdArray2 = [
    ["13", "Multi Action Floor Cleaner Critus", "300"],
    ["15", "Fabuloso Multi-Purpose Cleaner - Lavender Fresh", "220"],
    ["19", "Heavy Duty Multipurpose Cleaner with Germicide", "136",]
  ];
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h3>Top 3 Lowest stock</h3>
        <Table hover>
          <thead>
            <tr>
              {thArray1.map((prop, key) => {
                return <th key={key}>{prop}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tdArray1.map((prop, key) => {
              return (
                <tr key={key}>
                  {prop.map((prop, key) => {
                    return <td key={key}>{prop}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <h3>Top 3 fastest moving stock</h3>
        <Table hover>
          <thead>
            <tr>
              {thArray2.map((prop, key) => {
                return <th key={key}>{prop}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tdArray2.map((prop, key) => {
              return (
                <tr key={key}>
                  {prop.map((prop, key) => {
                    return <td key={key}>{prop}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <AlertNotification notifVisible={notifVisible} onDismiss={onDismiss} />
    </div>
  );
}

export default InventoryDashboard;
