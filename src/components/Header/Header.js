import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import "./Header.css";
import {rooturl} from '../../config/settings';

class Header extends Component {

    constructor() {
        super();

        //bind
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
      localStorage.removeItem("Token")
      localStorage.setItem("isAuthenticated",false)
      localStorage.removeItem("UserId")
        // axios.defaults.withCredentials = true;
        axios.post('http://'+rooturl+':3001/logout')
            .then(response => {
                if (response.status === 200) {
                    console.log('User logged out!');
                }
            });
    }

    render() {

        let loggedInUserContent = null;
        let ownerContent = null;
        let travelerContent = null;
        let ownerListPropertyTab = null;
        let ownerInboxContent = null;
        let travelerInboxContent = null;

        //if(cookie.load('Accounttype') >= 2){
        if(this.props.loginStateStore.result){
            if(this.props.loginStateStore.result.Accounttype >= 2){            
                ownerContent = <Link to="/owner-dashboard" className="dropdown-item blue-text" >Owner Dashboard</Link>
                ownerListPropertyTab = <span><Link to="/add-property" className="btn btn-lg lyp-btn">List your property</Link></span>
                ownerInboxContent = <Link to="/owner-inbox" className="dropdown-item blue-text">Owner Inbox</Link>
            }
        }

        if(this.props.loginStateStore.result){
            if(this.props.loginStateStore.result.Accounttype == 1 || this.props.loginStateStore.result.Accounttype == 3){
                travelerContent = <Link to="/my-trips" className="dropdown-item blue-text" >My Trips</Link>
                travelerInboxContent = <Link to="/traveler-inbox" className="dropdown-item blue-text" >Traveler Inbox</Link>
            }
        }
       
        let username = null;
        if(this.props.loginStateStore.result){
            username = this.props.loginStateStore.result.FirstName;
        }
        if(this.props.loginStateStore.result){
            if (this.props.loginStateStore.result.isAuthenticated === true) {
                loggedInUserContent = <span className="header-bar-tabs">
                    <span className="blue-text">Trip Boards</span>
                    <span>
                        <Link to="#" className="btn dropdown-toggle userName-dropdown" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {username}
                        </Link>
                        {this.props.name}
    
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <Link to="/profile" className="dropdown-item blue-text">Profile</Link>
                            {travelerContent}
                            {travelerInboxContent}
                            {ownerContent}  
                            {ownerInboxContent}                                                  
                            <a className="dropdown-item blue-text" href="/login" onClick={this.handleLogout}>Logout</a>
                        </div>                    
                    </span>
                    {ownerListPropertyTab}                
                </span>
            }
        }
        

        return (
            <div className="x">
                <div className="row header-bar " >
                    <div className="col-2">
                    <Link to="/home">
                        <img className="logair" src={require('../../Static/Images/airbnb.png')} alt="logo-homeaway" />
                    </Link>
                    </div>
                    
                    {/* {loggedInUserContent} */}
                   <div className="col-6">
                   <div className="searchBar">
                        <div className="lookupBarSelector selector" tabIndex="-1">
                            <div className="selectorInputWrpaper">
                                <form className="searchform" onSubmit={this.handleSubmit}>
                                    <div className="input-group md-form form-sm form-1">
                                        <div className="input-group-prepend">
                                            <span id="searchicon" className="input-group-text">
                                                <i className="fa fa-search" aria-hidden="true" />
                                            </span>
                                        </div>
                                        <input
                                        className="form-control1"
                                        id="searchba"
                                        type="text"
                                        name="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        onChange={this.handleChange}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
                </div>
                
                <div className="col-3 leftnav">
                <span><Link to="/add-property" id="edit1">Add Listing</Link></span>
                <span><Link to="/my-trips">My Trips</Link></span>
                  <div className="hover-menu">
                    <div className="hover-menu-contents">
                     
                      <span className="expanded">
                          
                        <span className="photoWrapper">
                          <div id="#123">
                            <span className="photo-tooltip">
                              
                                <img
                                  src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"
                                  alt="proImg"
                                 
                                  className="profilephotodropdown"
                                  data-toggle="dropdown"
                                />
                              
                              
                              <ul className="dropdown-menu" id="navbardropdown">
                                <li>
                                  <Link
                                    to="/profile"
                                    className="list-group-item list-group-item-action list-group-item-light"
                                  >
                                    Profile
                                  </Link>
                                </li>
                                
                                {/* <li><button type="button" class="list-group-item list-group-item-action list-group-item-light" data-toggle="modal" data-target="#DisplayAllMessages">Messages</button></li> */}
                                <li>
                                  <Link
                                    to="/property-display"
                                   
                                    className="list-group-item list-group-item-action list-group-item-light"
                                  >
                                    My properties
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/login"
                                   
                                    className="list-group-item list-group-item-action list-group-item-light"
                                  >
                                    Logout
                                  </Link>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="list-group-item list-group-item-action list-group-item-light"
                                    
                                  >
                                    Delete Account
                                  </a>
                                </li>
                              </ul>
                            </span>
                          </div>
                        </span>
                      </span>
                      {/* </Link> */}
                    </div>
                  </div>
                
                
                </div>
                <div className="col-1"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginStateStore : state.login
})

//export default Header;
export default connect(mapStateToProps, {})(Header);