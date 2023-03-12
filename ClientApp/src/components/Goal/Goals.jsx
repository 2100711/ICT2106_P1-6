import React, { Component } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  ProgressBar,
  Modal,
  Alert,
} from "react-bootstrap";

export class Goals extends Component {
  static displayName = Goals.name;

  constructor(props) {
    super(props);

    // States
    this.state = {
      goals: [],
      currentGoal: [],
      goalID: 0,
      cumulativeCF: 10.0,
      targetCF: 0.0,
      goalDuration: 0,
      startDate: "",
      endDate: "",
      progress: 0.0,
      createModal: false,
      editModal: false,
    };

    // Bindings
    this.generateRandomId = this.generateRandomId.bind(this);
    this.checkIfGoalIdExists = this.checkIfGoalIdExists.bind(this);
    this.getGoals = this.getGoals.bind(this);
    this.getCurrentGoal = this.getCurrentGoal.bind(this);
    this.createGoal = this.createGoal.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
  }

  componentDidMount() {
    this.getGoals();
  }

  generateRandomId() {
    const minId = 100000; // Set a minimum ID value
    const maxId = 999999; // Set a maximum ID value
    let id = Math.floor(Math.random() * (maxId - minId + 1) + minId);

    const exist = this.checkIfGoalIdExists(id);
    if (exist === true) {
      this.generateRandomId();
    } else {
      this.setState({ goalID: id });
    }
  }

  async checkIfGoalIdExists(goalId) {
    console.log("populating goals");
    const response = await fetch(`api/goals/checkid/${goalId}`);
    const data = await response.json();
    console.log(data);
  }

  async getGoals() {
    //populate goals
    console.log("populating goals");
    const response = await fetch("api/goals/getgoals");
    const data = await response.json();
    let dataArray = Array.from(data);
    this.setState({ goals: dataArray });
    setTimeout(() => {
      this.getCurrentGoal();
    }, 1000);
  }

  async getCurrentGoal() {
    //populate current goal
    console.log("populating current goal");
    const response = await fetch(
      `api/goals/getgoal/${this.state.goals.slice(-1)[0].goalID}`
    );
    const data = await response.json();
    this.setState({ currentGoal: data });
  }

  createGoal(e) {
    e.preventDefault();
    this.generateRandomId();
    const startDate = new Date(this.state.startDate);
    const endDate = new Date(
      startDate.getTime() + this.state.goalDuration * 24 * 60 * 60 * 1000
    );
    this.setState({ endDate: endDate.toISOString().slice(0, 10) });
    const formData = JSON.stringify({
      goalID: this.state.goalID,
      cumulativeCF: this.state.cumulativeCF,
      targetCF: this.state.targetCF,
      goalDuration: this.state.goalDuration,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      progress: ((this.state.cumulativeCF / this.state.targetCF) * 100).toFixed(
        2
      ),
    });
    fetch("api/goals/creategoal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    })
      .then((res) => {
        this.getGoals();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateGoal(e) {
    e.preventDefault();
    const startDate = new Date(this.state.startDate);
    const endDate = new Date(
      startDate.getTime() + this.state.goalDuration * 24 * 60 * 60 * 1000
    );
    this.setState({ endDate: endDate.toISOString().slice(0, 10) });
    let formData = JSON.stringify({
      goalID: this.state.currentGoal.goalID,
      cumulativeCF: this.state.currentGoal.cumulativeCF,
      targetCF: this.state.targetCF,
      goalDuration: this.state.goalDuration,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      progress: (
        (this.state.currentGoal.cumulativeCF / this.state.targetCF) *
        100
      ).toFixed(2),
    });
    console.log(formData);
    fetch(`api/goals/updategoal/${this.state.currentGoal.goalID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: formData,
    })
      .then((res) => {
        this.getGoals();
        e.target.reset();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteGoal(id) {
    fetch(`api/goals/deletegoal/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        this.getGoals();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container>
        <h2>Current Goal</h2>
        <p>Total CF: {this.state.currentGoal.cumulativeCF}</p>
        <p>Target CF: {this.state.currentGoal.targetCF}</p>
        <p>
          End Date:{" "}
          {new Date(this.state.currentGoal.endDate).toLocaleDateString("en-GB")}
        </p>
        <ProgressBar
          now={this.state.currentGoal.progress}
          label={`${this.state.currentGoal.progress}%`}
        />
        <br />
        <Button
          variant="primary"
          onClick={() => this.setState({ createModal: true })}
        >
          Create New Goal
        </Button>{" "}
        <Button
          variant="outline-primary"
          onClick={() => {
            this.setState({
              currentGoal: this.state.currentGoal,
              editModal: true,
            });
          }}
        >
          Edit
        </Button>
        <br />
        <br />
        {this.state.goals.length < 2 && (
          <Alert variant="warning">No past goals yet.</Alert>
        )}
        {this.state.goals.length > 1 && (
          <>
            <h2>Past Goals</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Actual CF</th>
                  <th>Target CF</th>
                  <th>Goal Duration (Days)</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Progress</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {this.state.goals.slice(0, -1).map((goal) => (
                  <tr key={goal.goalID}>
                    <td>{goal.goalID}</td>
                    <td>{goal.cumulativeCF}</td>
                    <td>{goal.targetCF}</td>
                    <td>{goal.goalDuration}</td>
                    <td>
                      {new Date(goal.startDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      {new Date(goal.endDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      <ProgressBar
                        now={goal.progress}
                        label={`${goal.progress}%`}
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          this.setState({ goals: goal, editModal: true });
                        }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                        onClick={() => this.deleteGoal(goal.goalID)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        <Modal show={this.state.createModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Goal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTarget">
                <Form.Label>Target</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter target"
                  onChange={(event) =>
                    this.setState({ targetCF: event.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter start date"
                  onChange={(event) =>
                    this.setState({ startDate: event.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter duration"
                  onChange={(event) =>
                    this.setState({ goalDuration: event.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ createModal: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.createGoal}>
              Create Goal
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.editModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Goal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTarget">
                <Form.Label>Target</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={this.state.currentGoal.targetCF}
                  onChange={(event) =>
                    this.setState({ targetCF: event.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={new Date(this.state.currentGoal.startDate)
                    .toLocaleDateString("en-GB")
                    .split("/")
                    .reverse()
                    .join("-")}
                  onChange={(event) =>
                    this.setState({ startDate: new Date(event.target.value) })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={this.state.currentGoal.goalDuration}
                  onChange={(event) =>
                    this.setState({ goalDuration: event.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ editModal: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.updateGoal}>
              Update Goal
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      // <form onSubmit={this.createGoal}>
      //   <label htmlFor="cumulativeCF">Cumulative CF:</label>
      //   <input
      //     type="number"
      //     name="cumulativeCF"
      //     id="cumulativeCF"
      //     onChange={event => this.setState({ cumulativeCF: event.target.value })}
      //   />
      //   <br />
      //   <label htmlFor="targetCF">Target CF:</label>
      //   <input
      //     type="number"
      //     namw="targetCF"
      //     id="targetCF"
      //     onChange={event => this.setState({ targetCF: event.target.value })}
      //   />
      //   <br />
      //   <label htmlFor="goalDuration">Goal Duration (days):</label>
      //   <input
      //     type="number"
      //     name="goalDuration"
      //     id="goalDuration"
      //   onChange={event => this.setState({ goalDuration: event.target.value })}
      //   />
      //   <br />
      //   <label htmlFor="startDate">Start Date:</label>
      //   <input
      //     type="date"
      //     name="startDate"
      //     id="startDate"
      //     onChange={event => this.setState({ startDate: event.target.value })}
      //   />
      //   <br />
      //   <label htmlFor="endDate">End Date:</label>
      //   <input
      //     type="date"
      //     name="endDate"
      //     id="endDate"
      //     onChange={event => this.setState({ endDate: event.target.value })}
      //   />
      //   <br />
      //   <button type="submit">Create Goal</button>
      //   </form>
    );
  }
}
