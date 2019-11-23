 import * as firebase from 'firebase';
import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Header from '../Header/Header';


import { connect } from 'react-redux';
import { submitLogin } from '../../actions/index';
import { Field, reduxForm } from 'redux-form';

class Login extends Component {



    constructor() {
        super();

        this.state = {

            Email: "",
            Password: "",
            formValidationFailure: false,
            isValidationFailure: true,
            errorRedirect: false,
            isAuthenticated:localStorage.getItem("isAuthenticated")
        }


        //Bind events        
    }

   

    //Define component to be rendered
    renderField(field) {

        const { meta: { touched, error } } = field;
        const className = touched && error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
        const inputType = field.type;
        const inputPlaceholder = field.placeholder;
        const errorMessageStyling =  touched && error ? "text-danger" : "";

        return (

            <div className="form-group">
                <label>{field.label}</label>
                <input className={className} type={inputType} placeholder={inputPlaceholder} {...field.input} />
                <div className={errorMessageStyling}>
                    <div>{touched ? error : ""}</div>
                    
                </div>
            </div>
        );
    }


    //
    onSubmit(values) {
    
        var data = {
            Email: values.email,
            Password: values.password
        }
        // var firebaseConfig = {
        //     apiKey: "AIzaSyDGmFFot0TKg5AUG6PWLgv5aMTTBgt4--k",
        //     authDomain: "airbnb-clone-b0eeb.firebaseapp.com",
        //     databaseURL: "https://airbnb-clone-b0eeb.firebaseio.com",
        //     projectId: "airbnb-clone-b0eeb",
        //     storageBucket: "airbnb-clone-b0eeb.appspot.com",
        //     messagingSenderId: "472092600440",
        //     appId: "1:472092600440:web:b4dd9ab3452ee60107a58d"
        //   };
        //   // Initialize Firebase
        //   firebase.initializeApp(firebaseConfig);


        // this.props.submitLogin(data);
        axios.post('https://ec2-18-236-158-50.us-west-2.compute.amazonaws.com:3000/users/login', data)
            .then(response => {
                console.log(response);
                if (response.status === 200) {                 
                // firebase.auth().signInWithCustomeToken(response.data.Token)
                // .then(data=>{console.log("done")})
                    localStorage.setItem("token", response.data.Token);
                    localStorage.setItem("UserId",response.data.UserId);
                    localStorage.setItem("Email",response.data.Email);
                    localStorage.setItem("FirstName",response.data.FirstName);
                    localStorage.setItem("LastName",response.data.LastName);
                    localStorage.setItem("isAuthenticated",true)
                   this.props.history.push("/home")
                }                               
            })
            .catch((err) => {
                if (err) {
                   
                    var resultData = {
                        isAuthenticated : false
                    }
                       console.log(err);
                        console.log('inside res status 401', err);
                                              
                   
                }

            });
    }

    render() {

        let redrirectVar = null;        

        if (this.props.loginStateStore.result) {
            if(this.props.loginStateStore.result.isAuthenticated === true){
                redrirectVar = <Redirect to="/home" />
            }
            
        }

        if (this.state.errorRedirect) {
            redrirectVar = <Redirect to="/error" />
        }

        let errorPanel = null;
        if (this.props.loginStateStore.result) {
        if (this.props.loginStateStore.result.isAuthenticated === false) {
            errorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Username and Password doesn't match!
                </div>
            </div>

        }
    }

        let formErrorPanel = null;
        if (this.state.formValidationFailure) {
            formErrorPanel = <div>
                <div className="alert alert-danger" role="alert">
                    <strong>Validation Error!</strong> Username and Password are required!
                </div>
            </div>

        }

        const { handleSubmit } = this.props;

        return (
            <div>
                <Header />

                <div className="container">
                    {redrirectVar}
                    <div className="container content">
                        <div className="login-container">
                            
                           
                            <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">
                                <div className="login-form-heading pad-top-10 input-group-lg topInner">
                                   Account login 
                            </div>
                                <hr />
                                {errorPanel}
                                {formErrorPanel}


                                <form name="loginForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                    <Field
                                        name="email"
                                        id="email"
                                        type="text"
                                        placeholder="Email Address"
                                        component={this.renderField}

                                    />

                                    <Field
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        component={this.renderField}

                                    />
                                    <div className="form-group login-form-control">
                                        <a href="" className="">Forgot Password?</a>
                                    </div>



                                    <div className="form-group login-form-control">
                                        <button className="btn btn-login col-lg-12 col-md-12 col-sm-12" type="submit" >Login </button>
                                    </div>
                                </form>
                                <hr />
                                <div>
                                
                                <p>Need an account? <a href="/sign-up">Sign Up</a></p>
                            </div>
                           
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//This method provides access to redux store
const mapStateToProps = state => ({
    loginStateStore: state.login
});

function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = "Enter E-mail";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }

    return errors;
}

//export default Login;
export default reduxForm({
    validate,
    form: "loginForm"
})(connect(mapStateToProps, { submitLogin })(Login));