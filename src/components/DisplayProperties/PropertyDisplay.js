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
            isAuthenticated:localStorage.getItem("isAuthenticated"),
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
            messageContent: "",
            Accomodates:"",
                        Bathrooms:"",
                        Bedrooms:"",
                        City:"",
                        Country:"",
                        Currency:"",
                        Description:"",
                        EndDate:"",
                        Image:"",
                        MaxStay:"",
                        MinStay:"",
                        Price:"",
                        PropertyId:"",
                        StartDate:"",
                        StreetAddr:"",
                        Title:"",
                        UserId:"",
                        Username:"",
                        ZipCode: "",
        }

        //Bind
        this.submitBooking = this.submitBooking.bind(this);
        this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
        this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    async componentDidMount() {
                var  PropertyId= this.props.match.params.id
       await axios.get('https://33sf4cmc8a.execute-api.us-east-1.amazonaws.com/prod/property/088b459f-d7bb-433c-43fe-df1823ccf293')
            .then(response => {
                if (response.status === 200) {
                    console.log('Result: ', response.data);
         
                    this.setState({
                        
                        Accomodates:response.data.Accomodates,
                        Bathrooms:response.data.Bathrooms,
                        Bedrooms:response.data.Bedrooms,
                        City:response.data.City,
                        Country:response.data.Country,
                        Currency:response.data.Currency,
                        Description:response.data.Description,
                        EndDate:response.data.EndDate,
                        Image:response.data.Image,
                        MaxStay:response.data.MaxStay,
                        MinStay:response.data.MinStay,
                        Price:response.data.Price,
                        PropertyId:response.data.PropertyId,
                        StartDate:response.data.StartDate,
                        StreetAddr:response.data.StreetAddr,
                        Title:response.data.Title,
                        UserId:response.data.UserId,
                        Username:response.data.Username,
                        ZipCode: "95050",
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

        // axios.defaults.withCredentials = true;
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
           // UserId:localStorage.getItem(UserId),
            Title:this.state.Title,
            CheckInDate: this.state.StartDate,
            CheckOutDate: this.sate.EndDate,
            Guests: this.state.Accomodates,
            Amount: e.target.value,
            Message:this.state.Message,
            EMail: localStorage.getItem("Email"),
            PropertyID:this.state.PropertyId
        }


        axios.post('https://4me1h75jea.execute-api.us-west-2.amazonaws.com/prod/property/book', data)
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
           
        if (this.state.state.Price) {


            const startDate = moment(this.props.homeStateStore.result.startDate);
            const timeEnd = moment(this.props.homeStateStore.result.endDate);
            const diff = timeEnd.diff(startDate);
            const diffDuration = moment.duration(diff);
            console.log('diffduration', diffDuration);
            totalCost = (diffDuration._data.days + 1) * this.state.Price.substring(1);
        }



        var StartDate = this.state.StartDate;
        
        var EndDate = "";
       
            var date = new Date(this.state.StartDate);
            var locale = "en-us";
            var month = date.toLocaleString(locale, { month: "short" });
            var day = date.getDate();
            StartDate = month + " - " + day;
            

            //End date
            date = new Date(this.state.EndDate);
            month = date.toLocaleString(locale, { month: "short" });
            day = date.getDate();
            EndDate = month + " - " + day;
            


        return (
            <div>
                <Header />
                {redrirectVar}
                <div className="form-group row search-tab container search-tab-display-property">
                </div>
                <div className=" container property-display-content border">
                    <div className="row">
                        <div className="property-display-img-content col-6">
                           
                        </div>
                        <div className="property-display-pricing-content col-5 border">
                            <div className="display-price">
                                <h4><strong>{this.state.Price}</strong></h4><span> per night</span>
                            </div>
                            <div>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td><div>Arrive</div><div className="blue-text">{StartDate}</div></td>
                                            <td><div>Depart</div><div className="blue-text">{EndDate}</div></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><div>Guests</div><div className="blue-text">{this.state.Accomodates ? this.state.Accomodates : "2"} guests</div></td>
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
                                    <span id="ownername"><strong> {this.state.Username}</strong></span>
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
                            <div className="details-content-headline-text"><h4><strong>{this.state.Title}</strong></h4></div>
                            <div>
                                <p>{this.state.propertyDetails.StreetAddr}, {this.state.City} </p>
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
                                            <td>{this.state.PropertyType}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Bedrooms</td>
                                            <td>{this.state.Bedrooms}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Sleeps</td>
                                            <td>{this.state.Accomodates}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Bathrooms</td>
                                            <td>{this.state.Bathrooms}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Min Stay</td>
                                            <td>{this.state.MinStay} nights</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="property-description-content">
                                <h3><strong>{this.state.Bedrooms} bedroom {this.state.Bathrooms} bath</strong></h3>
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