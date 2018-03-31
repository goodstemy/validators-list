import React, { Component } from 'react';
import Menu from './Menu';
import getWeb3 from "../js/getWeb3";
import helpers from "../helpers";
import { ToastContainer, toast } from 'react-toastify';

const styles = {
  marginTop: "10px",
};

class SetCandidate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      city: "",
      licenseExp: "",
      licenseID: "",
      address: "",
      metamaskTip: false,
    };

    this.addCandidate = this.addCandidate.bind(this);
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
  }

  async addCandidate() {
    if (this.state.fullName === "" || !this.state.fullName) {
      toast.error("You must enter a full name");
      return;
    }

    if (this.state.city === "" || !this.state.city) {
      toast.error("You must enter a city");
      return;
    }

    try {
      if (this.state.licenseExp === "" || !this.state.licenseExp || this.state.licenseExp.split("-").length !== 3) {
        toast.error("You must enter a valid license expiration");
        return;
      } else {
        const d = this.state.licenseExp.split("-");
        for (let i = 0; i < d.length; i++) {
          if (!Number.isInteger(+d[i])) {
            toast.error("You must enter a valid license expiration");
            return;
          }

          if (+d[i] < 1) {
            toast.error("You must enter a valid license expiration");
            return;
          }
        }
      }
    } catch (err) {
      toast.error("You must enter a valid license expiration");
      console.error(err);
      return;
    }

    if (this.state.address === "" || !this.state.address) {
      toast.error("You must enter a valid account address");
      return;
    }

    try {
      if (this.state.licenseID === "" || !this.state.licenseID || !Number.isInteger(+this.state.licenseID)) {
        toast.error("You must enter a valid license id");
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error("You must enter a valid license id");
      return;
    }

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

    let d = new Date();
    let res;

    try {
      let accounts = await this.state.web3.eth.getAccounts();

      toast.info("Please open metamask to submit transaction");

      res = await contract.methods.setCandidate(
        this.state.address,
        this.state.fullName,
        this.state.city,
        d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear(),
        this.state.licenseExp,
        this.state.licenseID
      ).send({from: accounts[0], gas: 500000, gasPrice: 1000000000});

      console.log(res);

      setTimeout(() => {
        window.location.replace("http://" + document.location.host + "/candidates");
      }, 2500)
    } catch (err) {
      toast.error(`Error while trying to set candidate: ${err}`);
      console.error(`Error while trying to set candidate: ${err}`);
      return;
    }

    toast.success("Candidate added! Redirect...");
  }

  render() {
    return (
      <div className="App">
        <Menu/>
        <ToastContainer />

        <div className="container text-center" style={styles}>
          <div className="row">
            <div className="col"></div>
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <b>Set candidate</b>
                </div>
                <div className="card-body">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Full Name</span>
                    </div>
                    <input type="text" id="fullName" className="form-control" placeholder="Full name of candidate"
                      onChange={(e) => {this.setState({fullName: e.target.value})}}/>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">City</span>
                    </div>
                    <input type="text" id="city" className="form-control" placeholder="Physical address"
                      onChange={(e) => {this.setState({city: e.target.value})}}/>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">License expiration</span>
                    </div>
                    <input type="text" id="licenseExp" className="form-control" placeholder="Ex: 01-01-2020 (1 January 2020)"
                      onChange={(e) => {this.setState({licenseExp: e.target.value})}}/>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">License ID</span>
                    </div>
                    <input type="text" id="licenseID" className="form-control" placeholder="Id of candidate's license"
                      onChange={(e) => {this.setState({licenseID: e.target.value})}}/>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Address</span>
                    </div>
                    <input type="text" id="licenseID" className="form-control" placeholder="Address of candidate account in blockchain"
                           onChange={(e) => {this.setState({address: e.target.value})}}/>
                  </div>

                  <i>Be careful when click this button. Make sure that you choose right metamask account to submit transaction</i>
                  <br/>
                  <button href="#" className="btn btn-primary" onClick={this.addCandidate}>Add to candidates</button>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
          </div>
        </div>
    )
  }
}

export default SetCandidate;