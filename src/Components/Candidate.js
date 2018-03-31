import React, { Component } from 'react';
import getWeb3 from "../js/getWeb3";
import { ToastContainer, toast } from 'react-toastify';
import helpers from "../helpers";

const styles = {
  marginTop: "10px",
};

class Candidate extends Component {
  constructor(props) {
    super(props);

    this.voteForCandidate = this.voteForCandidate.bind(this);
    this.state = {
      votes: this.props.candidate.votes
    };
  }

  async componentDidMount() {
    let web3;

    try {
      web3 = await getWeb3();
    } catch(err) {
      toast.error(`Error while injecting web3: ${err}`);
      console.error(`Error while injecting web3: ${err}`);
    }

    this.setState({web3});

    let validators;

    try {
      validators = await helpers.getValidators(web3)
    } catch (err) {
      toast.error(`Error while getting validators: ${err}`);
      console.error(`Error while getting validators: ${err}`);
    }

    this.setState({validators});
  }

  async voteForCandidate() {
    let abi;

    try {
      abi = await helpers.getAbi();
    } catch (err) {
      toast.error(`Error while getting ABI: ${err}`);
      console.error(`Error while getting ABI: ${err}`);
    }

    let contract;

    try {
      contract = new this.state.web3.eth.Contract(abi, helpers.CONTRACT_ADDRESS);
    } catch (err) {
      toast.error(`Error while creating contract instance: ${err}`);
      console.error(`Error while creating contract instance: ${err}`);
    }

    let account;

    try {
      let accounts = await this.state.web3.eth.getAccounts();
      account = accounts[0];
    } catch (err) {
      toast.error(`Error while getting accounts: ${err}`);
      console.error(`Error while getting accounts: ${err}`);
    }

    let isValidator = false;

    for (let i = 0; i < this.state.validators.length; i++) {
      console.log(this.state.validators[i]);
      if (this.state.validators[i].address === account) {
        isValidator = true;
        break;
      }
    }

    if (!isValidator) {
      toast.error("You must be a validator to vote for candidate");
      return;
    }

    try {
      toast.info("Please open metamask to vote");

      let res = await contract.methods.vote(account, this.props.candidate.address)
        .send({from: account, gas: 500000, gasPrice:  1000000000});

      if (res.status !== "0x1") {
        toast.error(`Error while trying to vote. Are you voted already?`);
        return;
      }

      this.setState({votes: +this.state.votes + 1});

      // 0xdb6475F4Af1a428C2C8F16aBeafdF75e43930E55
    } catch (err) {
      toast.error(`Error while trying to vote: ${err}`);
      console.error(`Error while trying to vote: ${err}`);
    }

    toast.success("Your vote is taken into account!");
  }

  render() {
    return(
      <div className="card" style={styles}>
        <ToastContainer />

        <div className="card-header">
          <b>{this.props.candidate.address}</b>
        </div>
        <div className="card-body">
          <p className="card-text">
            <b>Full Name</b>: {this.props.candidate.fullName} <br/>
            <b>City</b>: {this.props.candidate.city} <br/>
            <b>License expiration</b>: {this.props.candidate.licenseExpiration} <br/>
            <b>License ID</b>: {this.props.candidate.licenseId} <br/>
            <b>Created</b>: {this.props.candidate.minerCreation} <br/>
            <b>Votes</b>: {this.state.votes} <br/>
          </p>

          <button href="#" className="btn btn-primary" onClick={this.voteForCandidate}>Vote</button>
        </div>
      </div>
    )
  }
}

export default Candidate;