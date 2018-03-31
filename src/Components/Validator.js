import React, { Component } from 'react';

const styles = {
  marginTop: "10px",
};

class Validator extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className="card" style={styles}>
        <div className="card-header">
          <b>{this.props.validator.address}</b>
        </div>
        <div className="card-body">
          <p className="card-text">
            <b>Full Name</b>: {this.props.validator.fullName} <br/>
            <b>City</b>: {this.props.validator.city} <br/>
            <b>License expiration</b>: {this.props.validator.licenseExpiration} <br/>
            <b>License ID</b>: {this.props.validator.licenseId} <br/>
            <b>Created</b>: {this.props.validator.minerCreation} <br/>
            <b>Votes</b>: {this.props.validator.votes} <br/>
          </p>
        </div>
      </div>
    )
  }
}

export default Validator;