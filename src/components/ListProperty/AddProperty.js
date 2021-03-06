import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import {rooturl} from '../../config/settings';

import { photoHandler } from '../../actions/listPropertyActions';
import { connect } from 'react-redux';
class AddProperty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated:localStorage.getItem("isAuthenticated"),
            Email:localStorage.getItem("Email"),
            locationActive: true,
            detailsActive: false,
            photosActive: false,
            pricingActive: false,
            Country: "",
            StreetAddr: "",
            City: "",
           UserId:localStorage.getItem("UserId"),
            ZipCode: "",
            Title: "",
            Description: "",
            PropertyType: "",
            Bedrooms: "",
            Accomodates: "",
            Bathrooms: "",
            Image: "download3.jpeg",
            //photoThumbnail: [],
            StartDate: moment(),
            EndDate: moment(),
            Currency: "",
            Price: "",
            MinStay: "",
            MaxStay:"",
            Amenities:"",
            Spaces:"",
            locationError: false,
            detailsError: false,
            photosError: false,
            pricingError: false,
            propertyInsertComplete: false,
            errorRedirect: false
        }



        //bind
        this.handleAvailabilityStartDateChange = this.handleAvailabilityStartDateChange.bind(this);
        this.handleAvailabilityEndDateChange = this.handleAvailabilityEndDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitPropertyDetails = this.submitPropertyDetails.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        console.log('Next props', nextProps);
        if(nextProps.listPropertyStore.result){
            if (nextProps.listPropertyStore.result.Image !== this.state.Image) {
          this.setState({ Image: nextProps.listPropertyStore.result.Image });
        }
        }
        
      }

    handleLocationClick = () => {

        this.setState({
            locationActive: true,
            detailsActive: false,
            photosActive: false,
            pricingActive: false
        });
    }

    handleDetailsClick = () => {

        const validator = this.state.Country === "" || this.state.StreetAddr === "" || this.state.City === "" ||this.state.ZipCode === "";

        console.log(validator);
        if (validator) {

            this.setState({
                locationError: true
            })

        }
        else {
            this.setState({
                locationActive: false,
                detailsActive: true,
                photosActive: false,
                pricingActive: false,
                locationError: false

            });
        }
    }

    handlePhotosClick = () => {

        const validator = this.state.Title === "" || this.state.description === "" || this.state.propertyType === "" || this.state.bedrooms === "" || this.state.accomodates === "" || this.state.bathrooms === "";

        if (validator) {
            this.setState({
                detailsError: true
            })
        }
        else {
            this.setState({
                locationActive: false,
                detailsActive: false,
                photosActive: true,
                pricingActive: false,
                detailsError: false
            });
        }


    }

    handlePricingClick = () => {
        
        
        

            this.setState({
                locationActive: false,
                detailsActive: false,
                photosActive: false,
                pricingActive: true,
                photosError: false

            });
        

    }

    handleAvailabilityStartDateChange(date) {
        this.setState({
            StartDate: date
        })
    }

    handleAvailabilityEndDateChange(date) {
        this.setState({
            EndDate: date
        })
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === "Image") {
            console.log('Files : ', target.files);
            var Image = target.files;
            console.log('photos:', Image);
            //call action
            this.props.photoHandler(Image)                                   
        }
        else {
            this.setState({
                [name]: value
            });
        }

    }

    submitPropertyDetails = (e) => {

        var validator = this.state.Price === "" || this.state.MinStay === "";


        if (validator) {
            this.setState({
                pricingError: true
            })
        }
        else {
            e.preventDefault(); 
            const data1 = {
                UserId:this.state.UserId,
                Username:this.state.Email,
                Country: this.state.Country,
                StreetAddr: this.state.StreetAddr,
                City: this.state.City,
                ZipCode: this.state.ZipCode,
                Title: this.state.Title,
                Description: this.state.Description,
                // PropertyType: this.state.propertyType,
                Bedrooms: this.state.Bedroonms,
                Accomodates: this.state.Accomodates,
                Bathrooms: this.state.Bathrooms,
                StartDate: this.state.StartDate,
                EndDate: this.state.EndDate,
                Currency: "USD",
                Price: this.state.Price,
                MinStay: this.state.MinStay,
                PropertyType: {
                    "PrivateBed": false,
                    "Whole": true,
                    "Shared": false
                },
                Amenities: {
                    "Ac": false,
                    "Heater": false,
                    "TV": false,
                    "Wifi": true
                },
                "Spaces": {
                    "Kitchen": false,
                    "Closets": false,
                    "Parking": false,
                    "Gym": false,
                    "Pool": false
                },
                Image:this.state.Image
            }
console.log(data1)
          
        axios.post('https://33sf4cmc8a.execute-api.us-east-1.amazonaws.com/prod/property/addProperty',data1)
        .then(response => {
             console.log(response.data);
             this.setState({
                Properties: response.data
      })
    }).catch((err) =>{
                    if(err){
                        this.setState({
                            errorRedirect: true,
                            propertyInsertComplete: false,
                        })
                    }
                });

        }


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

        if(this.state.propertyInsertComplete){
            redrirectVar = <Redirect to="/" />
        }

        let locationErrorPane = null;

        if (this.state.locationError) {
            locationErrorPane = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Error!</strong> All fields are required!
                </div>
            </div>
        }

        let detailsErrorPane = null;

        if (this.state.detailsError) {
            detailsErrorPane = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Error!</strong> All fields are required!
                </div>
            </div>
        }

        let photosErrorPane = null;

        if (this.state.photosError) {
            photosErrorPane = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Error!</strong> All fields are required!
                </div>
            </div>
        }

        let pricingErrorPane = null;

        if (this.state.pricingError) {
            pricingErrorPane = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Error!</strong> All fields are required!
                </div>
            </div>
        }
        var photoThumbnails = null;
        if(this.props.listPropertyStore.result){
            
            //let photoThumbnails = this.state.photoThumbnail.map(function (thumbnail, index) {
            photoThumbnails = this.props.listPropertyStore.result.photoThumbnail.map(function (thumbnail, index) {    
            
                return (
                    <img src={thumbnail} className="img-thumbnail" alt="thumbnail" width="304" height="236" key={index}></img>
                )
            });
        }
        


        console.log('PhotoThumbnail inside return: ', this.state.photoThumbnail);


        return (
            <div className="x"> 
                <Header />
                <div className="add-property-content">
                    {redrirectVar}
                    <div className="container">
                       
                        <div className="row">
                           
                            <div className="menu-bar-hor col-6">
                                <div className="add-property-form">
                                    <div className={this.state.locationActive ? "location-form show-form" : "location-form"}>
                                        <div className="location-form-headlinetext">
                                            <h4>Location Details</h4>
                                        </div>
                                        
                                        <div>
                                            {locationErrorPane}
                                        </div>
                                        <div className="details-form-description pad-bot-10">
                                            <p>Fill in the location details of your property</p>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="Country" id="country" className="form-control form-control-lg" placeholder="Country" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="StreetAddr" id="streetAddress" className="form-control form-control-lg" placeholder="Street Address" onChange={this.handleInputChange} />
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="text" name="City" id="city" className="form-control form-control-lg" placeholder="City" onChange={this.handleInputChange} />
                                        </div>
                                      
                                        <div className="form-group">
                                            <input type="text" name="ZipCode" id="zipCode" className="form-control form-control-lg" placeholder="Zip Code" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group location-form-btn flt-right">
                                            <button className="btn btn-primary btn-lg btn-p" onClick={this.handleDetailsClick}>Next</button>
                                        </div>
                                    </div>

                                    <div className={this.state.detailsActive ? "details-form show-form" : "details-form"}>
                                        <div className="details-form-headlinetext">
                                            <h4>Describe your property</h4>
                                        </div>
                                        <hr />
                                        <div>
                                            {detailsErrorPane}
                                        </div>
                                        <div className="details-form-description pad-bot-10">
                                            <p>Start out with a descriptive headline and a detailed summary of your property</p>
                                        </div>

                                        <div className="form-group">
                                            <input type="text" name="Title" id="headline" className="form-control form-control-lg" placeholder="Title" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <textarea type="text" name="Description" id="description" className="form-control form-control-lg" placeholder="Description" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="PropertyType" id="propertyType" className="form-control form-control-lg" placeholder="Property Type" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="Bedrooms" id="bedrooms" className="form-control form-control-lg" placeholder="Bedrooms" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="Accomodates" id="accomodates" className="form-control form-control-lg" placeholder="Accomodates" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="Bathrooms" id="bathrooms" className="form-control form-control-lg" placeholder="Bathrooms" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group details-form-btn flt-right">
                                            <button className="btn btn-primary btn-lg btn-p" onClick={this.handlePhotosClick}>Next</button>
                                        </div>

                                    </div>

                                    <div className={this.state.photosActive ? "photos-form show-form" : "photos-form"}>
                                        <div>
                                            {photosErrorPane}
                                        </div>
                                        <div className="photos-form-headlinetext">
                                            <h4>Add up to a photo of your property</h4>
                                        </div>
                                        <hr />
                                        <div className="photos-form-description pad-bot-10">
                                            <p>Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 2 photos minimum.</p>
                                        </div>
                                        <div className="container photo-upload-btn-container">
                                            <div className="center-content">
                                                <button className="btn btn-lg photo-upload-btn">
                                                    <input type="file" name="Image" className="btn btn-lg photo-upload-btn" onChange={this.handleInputChange} multiple className="btn btn-lg photo-upload-btn" />
                                                </button>

                                                <button className="btn btn-lg photo-upload-btn">SELECT PHOTOS TO UPLOAD</button>
                                            </div>
                                        </div>
                                        <div className="pad-top-10 pad-bot-10">
                                            {photoThumbnails}
                                        </div>
                                        <div className="form-group flt-right">
                                            <button className="btn photos-form-btn btn-primary btn-lg btn-p" onClick={this.handlePricingClick}>Next</button>
                                        </div>
                                    </div>

                                    <div className={this.state.pricingActive ? "pricing-form show-form" : "pricing-form"}>
                                        <div className="pricing-form-headlinetext">
                                            <h4>How much do you want to charge?</h4>
                                        </div>
                                        <hr />
                                        {pricingErrorPane}
                                        <div className="pricing-form-description pad-bot-10">
                                            <p>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</p>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="StartDate">Start date</label>
                                            <DatePicker name="StartDate" id="StartDate" className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.StartDate} onChange={this.handleAvailabilityStartDateChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="EndDate">End date</label>
                                            <DatePicker name="EndDate" id="EndDate" className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.EndDate} onChange={this.handleAvailabilityEndDateChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="currency">Currency </label>
                                            <select name="Currency" id="currency" className="form-control form-control-lg" onChange={this.handleInputChange}>
                                                <option value="AUD">Australian Dollar (AUD)</option>
                                                <option value="EUR">Euros (EUR)</option>
                                                <option value="GBP">Great British Pound (GBP)</option>
                                                <option value="$">US Dollar (USD)</option>
                                                <option value="CAD">Canadian Dollar (CAD)</option>
                                                <option value="NZD">New Zealand Dollar (NZD)</option>
                                                <option value="BRL">Brazil Real (BRL)</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="baserate">Nightly Base Rate</label>
                                            <input type="text" name="Price" id="baserate" className="form-control form-control-lg" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="minStay">Minimum Stay (nights)</label>
                                            <input type="text" name="MinStay" id="minStay" className="form-control form-control-lg" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group flt-right">
                                            <button className="btn btn-primary btn-lg btn-p" onClick={this.submitPropertyDetails}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5">
                                <img src={require('../../Static/Images/addprop.png')}></img>
                            </div>
                        </div>

                    </div>

                   
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    listPropertyStore : state.listProperty,
    loginStateStore : state.login
});

export default connect(mapStateToProps, {photoHandler})(AddProperty);

