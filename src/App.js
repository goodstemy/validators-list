import React, { Component } from 'react';
import Loader from 'react-loader';
import Validator from './Components/Validator';
import Menu from './Components/Menu';
import getWeb3 from './js/getWeb3';
import helpers from './helpers';
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      validators: null,
    };
  }

  async componentDidMount() {
    let web3;

    try {
      web3 = await getWeb3();
    } catch(err) {
      toast.error(`Error while injecting web3: ${err}`);
      console.error(`Error while injecting web3: ${err}`);
      return;
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

  render() {
    return (
      <div className="App">
        <Menu/>
        <ToastContainer />

        {this.state.validators ?
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col-6">
                {this.state.validators.map((v, i) => {
                return <Validator key={i} validator={v}/>})}
              </div>
              <div className="col"></div>
            </div>
          </div>
        : <Loader/> }
      </div>
    );
  }
}


export default App;
