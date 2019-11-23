import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {rooturl} from '../../config/settings';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';


class Home extends Component {

    constructor(props) {
        super(props);     
        
        this.state = {
            searchStartDate : moment(),
            searchEndDate : moment(),
            PropertiesResult: []

        }
        

        //bind         
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleInputChange = (event) => { 
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name] : value
        });
    }

    handleStartDateChange = (date) =>{
        this.setState({
            searchStartDate : date
        })

    }

    handleEndDateChange = (date) => {
        this.setState({
            searchEndDate : date
        })
        
    }

    handleSearchClick = () => {
         axios.get('http://'+rooturl+'search/'+this.state.City)
            .then((response) => {
              this.setState({PropertiesResult : response.data})
                console.log("response",Response.data)
                document.getElementById("mainProp").classList.remove("no-display");
                document.getElementById("mainProp2").classList.add("no-display");
            })
            .catch((err)=>{
                // this.setState({
                //     errorRedirect: true
                // })
               console.log(err)
                 
            });

       

    }

    
    render() {

        let redrirectVar = null;
        if(this.props.loginStateStore.result){
            if(!this.props.loginStateStore.result.isAuthenticated === false){
                redrirectVar = <Redirect to="/login" />
            }
        }
        else{
            // redrirectVar = <Redirect to="/login" />
        }
             
        let propertyList = this.state.PropertiesResult.map(function (property, index) {
            return (
                <div className="container display-properties-container" key={index}>
                    {/* <Link to={'/property-display/' + property.PropertyId}> */}
                        <div className="property-content row border">
                            <div className="property-content-image col-3">
                                <img className="property-image" src={property.Photos} alt="property-image" />
                            </div>
                            <div className="property-content-desc col-9 hidden-xs">
                                <div>
                                    <h2><strong>{property.Title}</strong></h2>
                                    <div>{property.StreetAddr}, {property.City} </div>
                                    <div>Property Type : {property.Propertytype}</div>
                                    <div>{property.Bedrooms} BR</div>
                                    <div>{property.Bathrooms} BA</div>
                                    <div>Sleeps {property.Accomodates}</div>

                                </div>
                                <div className="pricing-content">
                                    <h5><strong>{property.Baserate}</strong> per night</h5>
                                </div>
                            </div>

                        </div>
                    {/* </Link> */}
                </div>
            )
        })




        return (
          


            <div className="home-container">
                <Header />
                {redrirectVar}
                <div className="property-listing-content no-display" id="mainProp">
            {propertyList}
         </div>
                <div className="content" id="mainProp2">
                    <div className="home-page-content">

                        <div className="Hero-Image">

                            <div className="jumbotron-content">
                                <h1>
                                    <div className="headline-text">Book beach houses, cabins,</div>
                                    <div className="headline-text">condos and more, worldwide</div>
                                </h1>                              
                                <div className="form-group row search-tab">                                    
                                   
                                    <span className="col-lg-8 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
                                        <input type="textbox" className="form-control form-control-lg" name="City" placeholder="Search City" onChange={this.handleInputChange}></input>                                        
                                    </span>
                                   
                                    <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                                        <input type="textbox" className="form-control form-control-lg" name="guests" placeholder="2 guests" onChange={this.handleInputChange}></input>
                                    </span>
                                    <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                                        <Link to="/display-properties" className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={this.handleSearchClick}>Search</Link>
                                    </span>                                   
                                </div>
                            </div>                            
                            
                            <div className="home-page-list-content hidden-xs">
                                <ul className="home-page-list">
                                    <li className="value-props-item">
                                        <strong className="value-props-title">Your whole vacation starts here</strong>
                                        <span className="value-props-content">Choose a rental from world's best location</span>
                                    </li>
                                    <li className="value-props-item">
                                        <strong className="value-props-title">Book and stay with confidence</strong>
                                        <span className="value-props-content">Secure payments, peace of mind</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="clear">
                            </div>
                        </div>


                        <div className="recent-activity">
                            <div className="jumbotron container recent-activity-content">

                                <div className="container mt-3">

                                    <h3>Recent Activity</h3>
                                    <div id="myCarousel" className="carousel slide" data-ride="carousel">


                                        <ul className="carousel-indicators">
                                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                            <li data-target="#myCarousel" data-slide-to="1"></li>
                                            <li data-target="#myCarousel" data-slide-to="2"></li>
                                        </ul>


                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img className="carousel-img" src="https://odis.homeaway.com/odis/listing/4276d9d1-5735-4c1f-9a9a-22948b7d9bbd.c10.jpg" alt="home-1" />
                                            </div>
                                            <div className="carousel-item">
                                                <img className="carousel-img" src="https://odis.homeaway.com/odis/listing/638f7548-db23-4241-a224-8fc7da156d1e.c10.jpg" alt="home-2" />
                                            </div>
                                            <div className="carousel-item">
                                                <img className="carousel-img" src="https://odis.homeaway.com/odis/listing/668d6c3b-a08c-4a1d-b299-f3d6db1af3af.c10.jpg" alt="home-3" />
                                            </div>
                                        </div>

                                        <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                        </a>
                                        <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        <div className="lyp-container h-100">                            
                            <img src="http://cms.homeaway.com/files/live/sites/hub/files/contributed/homepage/marketing/list-your-property.jpg" alt="lyp-image"></img>    
                            <div className="lyp-content center-content">
                                    <h1>List your Property</h1>
                                    <a href="/add-property" className="btn btn-success btn-lg">List Your Property</a>
                            </div>
                        </div>
                        
                        

                    </div>
                </div>
            </div>
        )
    }
}

//
const mapStateToProps = state => ({
    // homeStateStore : state.home,
    loginStateStore : state.login
})

//export default Profile;
export default connect(mapStateToProps, {  })(Home);