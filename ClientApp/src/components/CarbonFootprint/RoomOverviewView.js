import React, { Component } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// import withRouter from "./withRouter";

export class RoomOverviewView extends Component {
  static displayName = RoomOverviewView.name;

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      historyArr: [],

      // Modal form
      logDate: new Date().toISOString().split('T')[0],
      carbonFootprintEmission: "",
      electricityUsage: "",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalInput = this.handleModalInput.bind(this);
    this.addElectricityLog = this.addElectricityLog.bind(this);
  }

  componentDidMount() {
    this.getLogs();
  }

  async getLogs() {
    const response = await fetch(`api/building/log/${window.location.href.split("/")[5]}`);
    const data = await response.json();
    this.setState({ historyArr: data });
  }

  handleModalInput(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  toggleModal() {
    console.log("toggled modal");
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  addElectricityLog() {
    const historyArrSize = this.state.historyArr.length;
    const pk = `${window.location.href.split("/")[5]}` + `${historyArrSize}`;
    fetch(
      `/api/building/log/create/${pk}/${window.location.href.split("/")[5]}/${this.state.logDate}/${this.state.carbonFootprintEmission}/${this.state.electricityUsage}`,
      { method: 'POST' }
    ).then(res => {
      this.toggleModal();
      this.getLogs();
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const level = window.location.href.split("/")[4];
    const roomID = window.location.href.split("/")[5];
    return (
      <div>
        <h1>Room Details</h1>
        <div
          style={{
            width: "auto",
            // border: "1px solid black",
            marginTop: "1em",
            marginBottom: "1em",
            paddingTop: "1em",
          }}
        >
          <div
            style={{
              width: "50%",
              // border: "1px solid red",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormGroup
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Col sm={4}>
                <Label for="roomID" style={{ fontSize: 20 }}>
                  RoomID:
                </Label>
              </Col>
              <Col sm={8}>
                <Input
                  id="roomID"
                  name="roomID"
                  placeholder={roomID}
                  disabled
                />
              </Col>
            </FormGroup>
            <FormGroup
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Col sm={4}>
                <Label for="level" style={{ fontSize: 20 }}>
                  Level:
                </Label>
              </Col>
              <Col sm={8}>
                <Input id="level" name="level" placeholder={level} disabled />
              </Col>
            </FormGroup>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #a6a6a6",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1em",
            }}
          >
            <h2>Electricity History</h2>
            <Button onClick={this.toggleModal} color="success">
              Add New Log
            </Button>
          </div>
          <hr />
          <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
              <tr>
                <th>Date</th>
                <th>Carbon Footprint</th>
                <th>Electricity Usage</th>
              </tr>
            </thead>
            <tbody>
              {this.state.historyArr.map((history, i) => {
                return (
                  <tr key={i}>
                    <td>{history.logDate}</td>
                    <td>{history.electricityUsage}</td>
                    <td>{history.carbonFootprintEmission}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModal}>Log Electricity</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="logDate">Date:</Label>
                <Input
                  type="date"
                  id="logDate"
                  onChange={this.handleModalInput}
                />
              </FormGroup>

              <FormGroup>
                <Label for="carbonFootprintEmission">Carbon Footprint:</Label>
                <Input
                  type="number"
                  id="carbonFootprintEmission"
                  onChange={this.handleModalInput}
                />
              </FormGroup>

              <FormGroup>
                <Label for="electricityUsage">Electricity Usage (kW):</Label>
                <Input
                  type="number"
                  id="electricityUsage"
                  onChange={this.handleModalInput}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addElectricityLog}>
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
