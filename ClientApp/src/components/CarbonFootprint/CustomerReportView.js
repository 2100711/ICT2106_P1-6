import React, { Component } from "react";
import {
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Label,
  Input,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

export class CustomerReportView extends Component {
  static displayName = CustomerReportView.name;

  constructor(props) {
    super(props);

    // States
    this.state = {
      selectedMonth: "January",
      activeTab: "product",
      productInfo: [],
      shipmentInfo: [],
    };

    // Bindings
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleMonth = this.toggleMonth.bind(this);
    this.convertMonthToInt = this.convertMonthToInt.bind(this);
    this.populateCarbonData = this.populateCarbonData.bind(this);
  }

  componentDidMount() {
    this.populateCarbonData();
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  async toggleMonth(e) {
    var month = e.target.value;
      if (this.state.selectedMonth !== month) {
          //var monthValue = this.convertMonthToInt(month);
          this.setState({
            selectedMonth: month,
          });

          //populate product based on filtered month
          //const response1 = await fetch('customerreport/product/' + monthValue);
          //const data1 = await response1.json();
          //this.setState({ productInfo: data1 });

          //populate shipping based on filtered month
          //const response2 = await fetch('customerreport/shipping/' + monthValue);
          //const data2 = await response2.json();
          //this.setState({ shipmentInfo: data2 });
    }
  }

  convertMonthToInt(month) {
    switch (month) {
      case "February":
        return "02";
      case "March":
        return "03";
      case "April":
        return "04";
      case "May":
        return "05";
      case "June":
        return "06";
      case "July":
        return "07";
      case "August":
        return "08";
      case "September":
        return "09";
      case "October":
        return "10";
      case "November":
        return "11";
      case "December":
        return "12";
      default:
        return "01";
    }
  }

  async populateCarbonData() {
    //set controller parameter
    var month = this.convertMonthToInt(this.state.selectedMonth);

    //populate product
    const response1 = await fetch('customerreport/products/2023/' + month); // hardcoded year for now
    const data1 = await response1.json();
    this.setState({ productInfo: data1 });

    //populate shipping
    const response2 = await fetch('customerreport/shippings/2023/' + month); // hardcoded year for now
    const data2 = await response2.json();
    this.setState({ shipmentInfo: data2 });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
        }}
      >
        <h1>Monthly Report</h1>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <FormGroup
            row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Label for="month" style={{ fontSize: 20 }} sm={3}>
              Month
            </Label>

            <Col sm={7}>
              <Input
                id="month"
                name="select"
                type="select"
                onClick={(e) => this.toggleMonth(e)}
              >
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </Input>
            </Col>
            <Col sm={2}>
              <Button color="success" onClick={this.populateCarbonData}>Filter</Button>
            </Col>
          </FormGroup>
        </div>

        <Nav fill tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "product",
              })}
              onClick={() => this.toggleTab("product")}
            >
              Product
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "shipping",
              })}
              onClick={() => this.toggleTab("shipping")}
            >
              Shipping
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="product">
            <div style={{ height: "70vh", overflowY: "scroll" }}>
              <table
                className="table table-striped"
                aria-labelledby="tableLabel"
              >
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Co2E</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.productInfo.map((val, key) => (
                    <tr key={key}>
                      <td>{val.name}</td>
                      <td>{val.co2e}</td>
                      <td>{val.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPane>

          <TabPane tabId="shipping">
            <div style={{ height: "70vh", overflowY: "scroll" }}>
              <table
                className="table table-striped"
                aria-labelledby="tableLabel"
              >
                <thead>
                  <tr>
                    <th>Shipment Method</th>
                    <th>Co2E</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.shipmentInfo.map((val, key) => (
                    <tr key={key}>
                      <td>{val.name}</td>
                      <td>{val.co2e}</td>
                      <td>{val.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPane>
        </TabContent>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "1.5em",
            paddingBottom: "1em",
            float: "right",
          }}
        >
          <Button color="primary" style={{ marginRight: 15 }}>Email</Button>
          <Button color="primary">Export</Button>
        </div>
      </div>
    );
  }
}
