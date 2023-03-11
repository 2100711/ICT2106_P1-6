import { Component } from 'react';
import PropTypes from 'prop-types';

export class Reward extends Component {
  static displayName = Reward.name;

  constructor(props) {
    super(props);
    this.state = { rewards: [], id: null, name: '', description: '' };

    this.getRewards = this.getRewards.bind(this);
    this.addReward = this.addReward.bind(this);
    this.updateReward = this.updateReward.bind(this);
    this.deleteReward = this.deleteReward.bind(this);
    this.handleRewardChange = this.handleRewardChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getRewards();
  }

  async getRewards() {
    const response = await fetch('api/rewards');
    const data = await response.json();
    this.setState({ rewards: data });
  }

  // async addReward(e) {
  //   e.preventDefault();
  //   let reward = {
  //     name: this.state.name,
  //     description: this.state.description
  //   };
  //   try {
  //     const response = await fetch('api/rewards', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(reward),
  //     }).then(async (response) => {
  //       console.log(response);
  //     });
  //     if (!response.ok) {
  //       console.log(response);
  //       throw new Error('Failed to add reward');
  //     }
  //     console.log(response);
  //     await response.json();
  //     alert('Reward added successfully');
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('Failed to add reward');
  //   }
  // }

  // async updateReward() {
  //   let reward = {
  //     id: this.state.id,
  //     name: this.state.name,
  //     description: this.state.description
  //   };
  //   try {
  //     const response = await fetch(`api/rewards/${reward.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(reward),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to update reward');
  //     }
  //     await response.json();
  //     alert('Reward updated successfully');
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('Failed to update reward');
  //   }
  // };

  async addReward() {
    let reward = {
      name: this.state.name,
      description: this.state.description
    };
    try {
      const response = await fetch('api/rewards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reward),
      });
      if (!response.ok) {
        throw new Error('Failed to add reward');
      }
      await response.json();
      alert('Reward added successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add reward');
    }
  }

  async updateReward() {
    let reward = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description
    };
    try {
      const response = await fetch(`api/rewards/${reward.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reward),
      });
      if (!response.ok) {
        throw new Error('Failed to update reward');
      }
      await response.json();
      alert('Reward updated successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update reward');
    }
  };


  async deleteReward(id) {
    try {
      const response = await fetch(`api/rewards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to delete reward');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleRewardChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEditClick(reward) {
    this.setState({
      id: reward.id,
      name: reward.name,
      description: reward.description,
      editing: true
    });
  }

  handleResetClick() {
    this.setState({
      id: null,
      name: '',
      description: ''
    });
  }

  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { id, name, description } = this.state;
  //   if (this.state.editing) {
  //     this.updateReward(id, name, description).then(() => {
  //       this.handleResetClick();
  //       this.getRewards();
  //     }).catch(error => {
  //       // handle error
  //       console.error(error);
  //     });
  //   } else {
  //     this.addReward(id, name, description).then(() => {
  //       this.handleResetClick();
  //       this.getRewards();
  //     }).catch(error => {
  //       // handle error
  //       console.error(error);
  //     });
  //   }
  // }

  handleSubmit(event) {
    event.preventDefault();
    const { reward, points, id } = this.state;
    if (this.state.editing) {
      this.updateReward(id, reward, points).then(() => {
        this.handleResetClick();
        this.getRewards();
        this.setState({ editing: false })
      }).catch(error => {
        // handle error
        console.error(error);
      });
    } else {
      this.addReward(reward, points).then(() => {
        this.handleResetClick();
        this.getRewards();
        this.setState({ editing: false })
      }).catch(error => {
        // handle error
        console.error(error);
      });
    }
  }

  handleDeleteClick(id) {
    const deletedReward = this.deleteReward(id);
    const rewards = this.state.rewards.filter((reward) => reward.id !== deletedReward.id);
    this.setState({ rewards });
    window.location.reload();
  };


  render() {
    return (
      <div className="container mt-4">
        <h1>Reward System</h1>
        <div className="row">
          <div className="col-md-4">
            <h3>Add/Edit Reward</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name || ''}
                  onChange={event => this.handleRewardChange(event)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={this.state.description || ''}
                  onChange={event => this.handleRewardChange(event)}
                />
              </div>
              <button className="btn btn-primary mr-2" type="submit">
                {this.state.id ? 'Update' : 'Add'}
              </button>
              <button className="btn btn-secondary" type="button" onClick={this.handleResetClick}>
                Reset
              </button>
            </form>
          </div>
          <div className="col-md-8">
            <h3>Reward List</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rewards.map((val, key) => (
                  <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.description}</td>
                    <td>
                      <button
                        className="btn btn-warning mr-2"
                        onClick={() => this.handleEditClick(val)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => {
                        this.handleDeleteClick(val.id)
                      }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  static propTypes = {
    rewards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
      })
    ).isRequired,
    addReward: PropTypes.func.isRequired,
    updateReward: PropTypes.func.isRequired,
    deleteReward: PropTypes.func.isRequired,
  }

  static defaultProps = {
    rewards: [],
  }
}

