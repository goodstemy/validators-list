import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Candidates from "./Components/Candidates";
import SetCandidate from "./Components/SetCandidate";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/candidates" component={Candidates}/>
      <Route exact path="/set-candidate" component={SetCandidate}/>
      <Redirect from="/*" to="/"/>
    </div>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
