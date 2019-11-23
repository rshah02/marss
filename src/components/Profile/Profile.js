import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import axios from 'axios';
import {rooturl} from '../../config/settings';

import { getProfileDetails, updateProfileDetails } from '../../actions/profileActions';
import { connect } from 'react-redux';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            errorRedirect: false,
        }

        //Bind
        this.handleChange = this.handleChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.toggleID=this.toggleID.bind(this);
    }
     toggleID=(e)=> {
        document.getElementById("prodi").classList.remove("no-display");
     }

    async componentDidMount() {
       
        this.setState({
            FirstName:localStorage.getItem("FirstName"),
            LastName:localStorage.getItem("LastName"),
            UserId:localStorage.getItem("UserId"),
            Photo:"",
            ProfileId:""
                         
        })
        //     var UserId=localStorage.getItem("UserId")
        //     let data={UserId:UserId}
        // axios.get('http://54.85.105.69:3000/profile')
        // .then(response => {
        //     if (response.status === 200) {
        //         console.log(response.data);
                
        //     }
        // }).catch((err)=>{
        //     console.log(err);
        // })
        console.log('state', this.state);
    }



    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if (name === "ProfileImage") {
            console.log(target.files);
            var profilePhoto = target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            axios.post('http://'+rooturl+':3001/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);
                        this.setState({
                            ProfileImage: profilePhoto.name
                        });
                    }
                }).catch((err) => {
                    if (err) {
                        this.setState({
                            errorRedirect: true
                        })
                    }
                });
        }
        else {
            this.setState({
                [name]: value
            });
        }

    }

    saveChanges = (e) => {
        e.preventDefault();


        const data = {
            UserId:this.state.UserId,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            Description: this.state.Description,
            Country: this.state.Country,
            City: this.state.City,
            Gender: this.state.Gender,
            Languages: this.state.Languages,
            ProfileId:this.state.ProfileId,
            Photo: this.state.Photo


        }

        console.log('Data: ', data);
        document.getElementById("prodi").classList.add("no-display")
        this.props.updateProfileDetails(data);
    }

    render() {

        let redrirectVar = null;
        if(this.props.loginStateStore.result){
            if(!this.props.loginStateStore.result.isAuthenticated ===false){
                redrirectVar = <Redirect to="/login" />
            }
        }
        else{
           // redrirectVar = <Redirect to="/login" />
        }

        if (this.props.profileStateStore.errorRedirect === true) {
            redrirectVar = <Redirect to="/error" />
        }

        //var profileImageData = <img src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        var profileImageData = "";
        if (this.props.profileStateStore.result) {
            profileImageData = <img src={this.props.profileStateStore.result.imageData} alt="logo" />

        }


        return (
            <div>
                <Header />
                <div className="container">
                    {redrirectVar}
                    <div className="center-content profile-heading">
                        {profileImageData}
                        <h3>{this.state.FirstName} {this.state.LastName}</h3>
                        <p></p>
                    </div>
                    <div className="container profile-content">
                        <div className="row">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-2">

                                    </div>
                                    <div className="col-8 border">
                                        <div className="profile-Image">
                                        <div className="proImg">
                                            <img
                          src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"
                          alt="proImg"
                          height="100"
                          width="100"
                          className="rounded-circle"
                        />
                        <div className="proImgback">
                                       
                                       <input type="file" name="ProfileImage" id="ProfileImage" className="btn prmg" onChange={this.handleChange} id="file" />
                                   </div>
                        
                                            </div>
                       
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 border">
                                <div className="headline-text">
                                    <p>Hi, I'm {this.state.FirstName}</p>
                                    <p id="edit" onClick={this.toggleID}>Edit profile</p>
                                </div>
                                <div className="profile-form-content no-display" id="prodi">

                                    {/* <div className="form-group">
                                        <input type="text" name="FirstName" id="firstname" className="form-control form-control-lg" placeholder="First name" onChange={this.handleChange} value={this.state.FirstName} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="LastName" id="lastname" className="form-control form-control-lg" placeholder="Last name" onChange={this.handleChange} value={this.state.LastName} />
                                    </div> */}
                                    <div className="form-group">
                                        <label class="" for="Aboutme">This is how I am</label>
                                        <textarea type="text" name="Description" id="aboutme" className="form-control form-control-lg" placeholder="Add a Description" onChange={this.handleChange} value={this.state.Description} />
                                    </div>
                                    <div className="form-group">
                                        <label class="" for="Email">Email me on</label>
                                        <input type="text" name="Email" id="email" className="form-control form-control-lg" placeholder="Email address" onChange={this.handleChange} value={this.state.Email} />
                                    </div>
                                    <div className="form-group">
                                    <label class="" for="Phone">Contact me on</label>
                                        <input type="text" name="Phone" id="phonenumber" className="form-control form-control-lg" placeholder="Phone Number" onChange={this.handleChange} value={this.state.PhoneNumber} />
                                    </div>
                                                              
                                    <div className="form-group">
                                        <label class="" for="City">I live in</label>
                                        <input type="text" name="City" id="city" className="form-control form-control-lg" placeholder="City" onChange={this.handleChange} value={this.state.City} />
                                    </div>
                                    <div className="form-group">
                                        <label class="" for="Gender">Gender</label>
                                        <input type="text" name="Gender" id="gender" className="form-control form-control-lg" placeholder="Gender" onChange={this.handleChange} value={this.state.Gender} />
                                    </div>
                                    <div className="form-group">
                                        <label class="" for="Aboutme">Languages I speak</label>
                                        <input type="text" name="Languages" id="language" className="form-control form-control-lg" placeholder="Language" onChange={this.handleChange} value={this.state.Languages} />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-lg btn-primary btn-p" onClick={this.saveChanges}>Save</button>
                                    </div>
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
    profileStateStore: state.profile,
    loginStateStore: state.login
})

//export default Profile;
export default connect(mapStateToProps, { getProfileDetails, updateProfileDetails })(Profile);