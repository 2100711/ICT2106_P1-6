import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
  Row,
} from "reactstrap";

export class BuildingOverviewView extends Component {
  static displayName = BuildingOverviewView.name;

  constructor(props) {
    super(props);
    this.state = {
      level1: [],
      level2: [],
      level3: [],
    };
  }

  componentDidMount() {
    this.getRooms();
  }

  async getRooms() {
    //populate rooms, array will be sent sorted
    const response1 = await fetch("api/building/room");
    const data1 = await response1.json();
    for (let i = 0; i < data1.length; i++) {
      if (data1[i].level === 1) {
        var temp1 = this.state.level1;
        temp1.push(data1[i]);
        this.setState({ level1: temp1 });
      } else if (data1[i].level === 2) {
        var temp2 = this.state.level2;
        temp2.push(data1[i]);
        this.setState({ level2: temp2 });
      } else {
        var temp3 = this.state.level3;
        temp3.push(data1[i]);
        this.setState({ level3: temp3 });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Overview</h1>
        <Row style={{ marginTop: 25 }}>
          <h2>Level 1</h2>
          {this.state.level1.map((val, key) => {
            //since array is sorted, when go up to next level it prints a title for current level
            return (
              <Col xs={12} sm={12} md={6} lg={4} xl={3} key={key}>
                <Card style={{ marginTop: 15, width: "16rem" }} id={key + 1}>
                  <CardBody>
                    <CardTitle tag="h5">Room ID: {val.roomID}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Level: {val.level}
                    </CardSubtitle>
                  </CardBody>
                  <CardBody>
                    <Button
                      color="primary"
                      href={"/building-report/" + val.level + "/" + val.roomID}
                    >
                      View
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Row style={{ marginTop: 25 }}>
          <h2>Level 2</h2>
          {this.state.level2.map((val, key) => {
            //since array is sorted, when go up to next level it prints a title for current level
            return (
              <Col xs={12} sm={12} md={6} lg={4} xl={3} key={key}>
                <Card style={{ marginTop: 15, width: "16rem" }} id={key + 6}>
                  <CardBody>
                    <CardTitle tag="h5">Room ID: {val.roomID}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Level: {val.level}
                    </CardSubtitle>
                  </CardBody>
                  <CardBody>
                    <Button
                      color="primary"
                      href={"/building-report/" + val.level + "/" + val.roomID}
                    >
                      View
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Row style={{ marginTop: 25, marginBottom: 45 }}>
          <h2>Level 3 or higher</h2>
          {this.state.level3.map((val, key) => {
            //since array is sorted, when go up to next level it prints a title for current level
            return (
              <Col xs={12} sm={12} md={6} lg={4} xl={3} key={key}>
                <Card style={{ marginTop: 15, width: "16rem" }} id={key + 10}>
                  <CardBody>
                    <CardTitle tag="h5">Room ID: {val.roomID}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Level: {val.level}
                    </CardSubtitle>
                  </CardBody>
                  <CardBody>
                    <Button
                      color="primary"
                      href={"/building-report/" + val.level + "/" + val.roomID}
                    >
                      View
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
