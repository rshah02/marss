import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import axios from 'axios';
import { connect } from 'react-redux';
import {rooturl} from '../../config/settings';

class PropertyDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrivalDate: moment(),
            departureDate: moment(),
            propertyDetails: {},
            photos: [],
            bookingStartDate: "",
            bokingEndDate: "",
            guests: 2,
            totalCost: 0,
            errorRedirect: false,
            redirectToHome: false,
            messageContent: ""
        }

        //Bind
        this.submitBooking = this.submitBooking.bind(this);
        this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
        this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        //axios.defaults.withCredentials = true;

        var data = {
            PropertyId: this.props.match.params.id
        }


        var data1=  { "Accomodates": 50,
        "Amenities": {
            "Ac": true,
            "Heater": true,
            "TV": true,
            "Wifi": true
        },
        "Bathrooms": 1,
        "Bedrooms": 0,
        "City": "San Jose",
        "Country": "USA",
        "Currency": "$",
        "Description": "OPEN",
        "EndDate": "19-9-2019",
        "MaxStay": 4,
        "MinStay": 2,
        "Price": 1000,
        "PropertyType": {
            "PrivateBed": false,
            "Shared": false,
            "Whole": false
        },
        "Spaces": {
            "Closets": false,
            "Gym": false,
            "Kitchen": false,
            "Parking": false,
            "Pool": false
        },
        "StartDate": "24-9-2019",
        "StreetAddr": "4388999",
        "Title": "New opening coming soon, yaaaaaayayayaayayya aaaaaaaaaaaaaaaaaaaaaaaaaaaas",
        "UserId": "1234567",
        "Username": "APeksha",
        "ZipCode": "95050",
        "image": "download4.jpeg"
    }
        //console.log('Data: ', data);
        // let headers = {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //   };
        axios.delete('http://DOCKERNLB-8a89fb4c38cb6609.elb.us-west-2.amazonaws.com:3000/ABC/myBookings/remove/b9343c8f-4b93-4ecc-401b-5b40703ad957')
            .then(response => {
                if (response.status === 200) {
                    console.log('Result: ', response.data);
         
                    this.setState({
                        // propertyDetails: response.data[0]
                        PropertyDetails:response.data
                    });

                   

                }
            }).catch((err) => {
                if (err) {
                    this.setState({
                        errorRedirect: true
                    });
                    console.log(err);
                }
            });
    }

    submitBooking = (e) => {

        axios.defaults.withCredentials = true;
        var token = localStorage.getItem("token");
        var data= {
            "UserId" : "657890",
            "Title" : "MY home",
            "Guests" : "1",
            "CheckInDate" :"12-22-2019",
            "CheckOutDate": "12-25-2019", 
            "Message": "Room without view",
            "Amount" : "500",
            "EMail" : "rohanshah739651@gmail.com"
        }
        var data = {
            //UserId:localStorage.getItem(UserId),
            Title:this.props.homeStateStore.result.Title,
            CheckInDate: this.props.homeStateStore.result.startDate,
            CheckOutDate: this.props.homeStateStore.result.endDate,
            Guests: this.props.homeStateStore.result.guests,
            Price: e.target.value,
            Message:this.state.PropertyDetails.Message,
            EMail: this.state.propertyDetails.Ownername,
            PropertyDetails: this.state.propertyDetails
        }


        axios.post('http://'+rooturl+':3001/submit-booking', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Booking Successful!');
                    this.setState({
                        redirectToHome: true
                    });
                }
            }).catch((err) => {
                if (err) {
                    this.setState({
                        errorRedirect: true
                    });
                }
            });

    }

    handleArrivalDateChange(date) {

        var month = date.toString().split(' ')[1];
        var day = date.toString().split(' ')[2];

        this.setState({
            arrivalDate: date,
            bookingStartDate: month + ' ' + day
        });
    }

    handleDepartureDateChange(date) {

        var month = date.toString().split(' ')[1];
        var day = date.toString().split(' ')[2];

        this.setState({
            departureDate: date,
            bookingEndDate: month + ' ' + day
        });
    }

    handleInputChange = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;


        this.setState({
            [name]: value
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

        if (this.state.errorRedirect === true) {
            redrirectVar = <Redirect to="/error" />
        }

        if (this.state.redirectToHome === true) {
            redrirectVar = <Redirect to="/home" />
        }

        var totalCost = 0;

        if (this.state.propertyDetails.Price && this.props.homeStateStore.result) {


            const startDate = moment(this.props.homeStateStore.result.startDate);
            const timeEnd = moment(this.props.homeStateStore.result.endDate);
            const diff = timeEnd.diff(startDate);
            const diffDuration = moment.duration(diff);
            console.log('diffduration', diffDuration);
            totalCost = (diffDuration._data.days + 1) * this.state.propertyDetails.Baserate.substring(1);
        }

        let carousalBlock = this.state.photos.map(function (item, index) {

            return (
                <div className={index == 0 ? "carousel-item active" : "carousel-item"} key={index}>
                    <img className=" carousel-img property-display-img" src={item} alt="property-image" />
                </div>
            )
        });

        let carousalIndicator = this.state.photos.map(function (item, index) {

            return (
                <li data-target="#myCarousel" data-slide-to={index} className={index == 0 ? "active" : ""} key={index}></li>
            )
        });

        //var startDate = this.state.propertyDetails.AvailabilityStartDate;
        var startDate = "";
        var endDate = "";
        if (this.props.homeStateStore.result) {
            var date = new Date(this.props.homeStateStore.result.startDate);
            var locale = "en-us";
            var month = date.toLocaleString(locale, { month: "short" });
            var day = date.getDate();
            startDate = month + " - " + day;
            console.log(startDate);

            //End date
            date = new Date(this.props.homeStateStore.result.endDate);
            month = date.toLocaleString(locale, { month: "short" });
            day = date.getDate();
            endDate = month + " - " + day;
            console.log(endDate);
        }


        return (
            <div>
                <Header />
                {redrirectVar}
                <div className="form-group row search-tab container search-tab-display-property">

                    <span className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
                        <input type="textbox" className="form-control form-control-lg" placeholder="Search"></input>
                    </span>
                    <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                        <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.CheckInDate} onChange={this.handleArrivalDateChange} />
                    </span>
                    <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                        <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.CheckOutDate} onChange={this.handleDepartureDateChange} />
                    </span>
                    <span className="col-lg-2 col-md-3 col-sm-4 col-xs-4 pad-bot-10">
                        <input type="textbox" className="form-control form-control-lg" placeholder="2 guests" name="Guests" onChange={this.handleInputChange}></input>
                    </span>
                    <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
                        <a href="/display-properties" className="btn btn-primry btn-lg" style={{ width: "100%" }}>Search</a>
                    </span>
                </div>
                <div className=" container property-display-content border">
                    <div className="row">
                        <div className="property-display-img-content col-6">
                            <div id="myCarousel" className="carousel slide" data-ride="carousel">


                                <ul className="carousel-indicators">
                                    {carousalIndicator}
                                </ul>

                                <div className="carousel-inner">
                                    {carousalBlock}
                                </div>

                                <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                    <span className="carousel-control-prev-icon"></span>
                                </a>
                                <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                                    <span className="carousel-control-next-icon"></span>
                                </a>
                            </div>
                        </div>
                        <div className="property-display-pricing-content col-5 border">
                            <div className="display-price">
                                <h4><strong>{this.state.propertyDetails.Price}</strong></h4><span> per night</span>
                            </div>
                            <div>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td><div>Arrive</div><div className="blue-text">{startDate}</div></td>
                                            <td><div>Depart</div><div className="blue-text">{endDate}</div></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><div>Guests</div><div className="blue-text">{this.props.homeStateStore.result ? this.props.homeStateStore.result.guests : "2"} guests</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <span className="pull-left">Total</span>
                                    <span className="flt-right">${totalCost}</span>
                                </div>
                                <div className="center-content">
                                    <button className="btn btn-lg btn-primary book-btn" onClick={this.submitBooking} value={totalCost}>Book now</button>
                                </div>
                                <hr />
                                <div className="center-content">
                                    <label htmlFor="ownername">Property Owner: </label>
                                    <span id="ownername"><strong> {this.state.propertyDetails.EMail}</strong></span>
                                </div>
                                <div>
                                    <div className="center-content">
                                        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Message Owner</button>
                                    </div>
                                    <div className="modal fade" id="myModal" role="dialog">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                <h4 className="modal-title">Ask Manager a Question</h4>
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>                                                    
                                                </div>
                                                <div className="modal-body">
                                                    <p></p>
                                                    <div className="form-group">
                                                        <textarea type="text" name="messageContent" id="messageContent" className="form-control form-control-lg" placeholder="Type your message here" onChange={this.handleInputChange}/>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.sendMessage}>Send</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="property-display-details-content col-6">
                            <div className="details-content-headline-text"><h4><strong>{this.state.propertyDetails.Title}</strong></h4></div>
                            <div>
                                <p>{this.state.propertyDetails.StreetAddress}, {this.state.propertyDetails.City} </p>
                            </div>
                            <div className="details-table">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Details</th>
                                            <th scope="col">Information</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Property type</td>
                                            <td>{this.state.propertyDetails.PropertyType}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Bedrooms</td>
                                            <td>{this.state.propertyDetails.Bedrooms}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Sleeps</td>
                                            <td>{this.state.propertyDetails.Accomodates}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Bathrooms</td>
                                            <td>{this.state.propertyDetails.Bathrooms}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Min Stay</td>
                                            <td>{this.state.propertyDetails.MinStay} nights</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="property-description-content">
                                <h3><strong>{this.state.propertyDetails.Bedrooms} bedroom {this.state.propertyDetails.Bathrooms} bath</strong></h3>
                                <div className="desc-content">
                                    {this.state.propertyDetails.Description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    homeStateStore: state.home,
    loginStateStore : state.login
});

//export default PropertyDisplay;

export default connect(mapStateToProps)(PropertyDisplay);