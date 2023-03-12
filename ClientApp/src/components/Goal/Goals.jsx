import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export class Goals extends Component {
    static displayName = Goals.name;

    constructor(props) {
        super(props);

        // States
        this.state = {
            goals: [],
            cumulativeCF: 0.0,
            targetCF: 0.0,
            goalDuration: 0,
            startDate: new Date(),
            endDate: new Date()
        };

        // Bindings
        this.populateGoals = this.populateGoals.bind(this);
        this.addGoal = this.addGoal.bind(this);
    }

    componentDidMount() {
        this.populateGoals();
    }

    async populateGoals() {
        //populate goals
        console.log('populating goals');
        const response = await fetch('api/goals');
        const data = await response.json();
        this.setState({ goals: data });
        console.log(data);
    }

    addGoal(e) {
        e.preventDefault();
        let formData = JSON.stringify({
            cumulativeCF: this.state.cumulativeCF,
            targetCF: this.state.targetCF,
            goalDuration: this.state.goalDuration,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });
        console.log(formData);
        fetch(`api/goals/creategoal`,
            { method: 'POST', body: formData, headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    BasicExample() {
        return <ProgressBar now={60} />;
    }

    render() {
        return (
            <div>
                <h1>My Goals</h1>
                <ProgressBar now={60} />
                <table
                    className="table table-striped"
                    aria-labelledby="tableLabel" >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cumulative CF</th>
                            <th>Target CF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.goals.map((val, key) => (
                            <tr key={key}>
                                <td>{val.goalID}</td>
                                <td>{val.cumulativeCF}</td>
                                <td>{val.targetCF}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <form onSubmit={this.addGoal}>
                    <label htmlFor="cumulativeCF">Cumulative CF:</label>
                    <input
                        type="number"
                        name="cumulativeCF"
                        id="cumulativeCF"
                        onChange={event => this.setState({ cumulativeCF: event.target.value })}
                    />
                    <br />
                    <label htmlFor="targetCF">Target CF:</label>
                    <input
                        type="number"
                        namw="targetCF"
                        id="targetCF"
                        onChange={event => this.setState({ targetCF: event.target.value })}
                    />
                    <br />
                    <label htmlFor="goalDuration">Goal Duration (days):</label>
                    <input
                        type="number"
                        name="goalDuration"
                        id="goalDuration"
                        onChange={event => this.setState({ goalDuration: event.target.value })}
                    />
                    <br />
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        onChange={event => this.setState({ startDate: event.target.value })}
                    />
                    <br />
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        onChange={event => this.setState({ endDate: event.target.value })}
                    />
                    <br />
                    <button type="submit">Add Goal</button>
                </form>
            </div>
        );
    }
};