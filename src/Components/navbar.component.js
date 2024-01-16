import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar(props){
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Exercise Manager</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={`/create/${props.id}`} className="nav-link">Create Exercise Log</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }

