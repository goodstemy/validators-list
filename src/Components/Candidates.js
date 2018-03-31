import React, { Component } from 'react';
import Loader from 'react-loader';
import Menu from './Menu';
import helpers from "../helpers";
import getWeb3 from "../js/getWeb3";
import Candidate from './Candidate';

const MASTER_ADDRESS = "0x7fC5f27f16777DEe947B9481B40Df60A3f243Be4";
const ABI_URL = "https://gist.githubusercontent.com/goodstemy/9221aa919b8215ee7eba47923fe7569e/raw/6558b044a96a12e65956b7d18d5fcb0f2e7bb8da/ValidatorsListAbi.json";

class Candidates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: [],
      isLoaded: false,
    }
  }

  async componentDidMount() {
    let web3;

    try {
      web3 = await getWeb3();
    } catch(err) {
      console.error(`Error while injecting web3: ${err}`);
    }

    this.setState({web3});

    let candidates;

    try {
      candidates = await helpers.getCandidates(web3);
    } catch (err) {
      console.error(`Error while getting candidates: ${err}`);
    }

    this.setState({candidates, isLoaded: true});
  }

  render() {
    return (
      <div className="App">
        <Menu/>
        {this.state.candidates.length === 0 && !this.state.isLoaded ?
          <Loader/>
          : this.state.candidates.length === 0 && this.state.isLoaded ?
          <h2 className="text-center">No any candidates</h2>
          :
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col-6">
                {this.state.candidates.map((c, i) => {
                  return <Candidate key={i} candidate={c}/>})}
              </div>
              <div className="col"></div>
            </div>
          </div>}
      </div>
    );
  }
}


export default Candidates;
