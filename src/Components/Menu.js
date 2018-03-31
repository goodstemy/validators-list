import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Validators list</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Validators</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/candidates">Candidates</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/set-candidate">Set candidate</Link>
              </li>
            </ul>
          </div>
        </nav>

    )
  }
}

export default Menu;