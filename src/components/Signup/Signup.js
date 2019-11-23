import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { signup } from '../../actions/index';
import { Field, reduxForm } from 'redux-form';
class Signup extends Component {

    constructor(props) {
        super(props);       
        this.state={
            StartDate: moment(),
            EndDate: moment(),
        }
        //bind
        this.handleAvailabilityStartDateChange = this.handleAvailabilityStartDateChange.bind(this);

       
    }

    handleAvailabilityStartDateChange(date) {
        this.setState({
            StartDate: date
        })
    }

    //Define component to be rendered
    renderField(field) {

        console.log(field);
        const { meta: { touched, error } } = field;
        const className = touched && error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg";
        console.log('filef name', field.placeholder);
        const inputType = field.type;
        const inputPlaceholder = field.placeholder;
        const errorMessageStyling = touched && error ? "text-danger" : "";
        var divClassName = "";
        if (field.id === "firstname") {
            divClassName = "form-group login-form-control pad-top-20";
        }
        else {
            divClassName = "form-group login-form-control";
        }


        return (

            <div className={divClassName} >
                <input className={className} type={inputType} placeholder={inputPlaceholder} {...field.input} />
                <div className={errorMessageStyling}>
                    <div>{touched ? error : ""}</div>

                </div>
            </div>
        );
    }
 
     //Submit
     onSubmit(values){

        var data = {
            FirstName: values.firstname,
            LastName: values.lastname,
            Email: values.email,
            Password: values.password,
          
        }

       // e.preventDefault();
        this.props.signup(data);
        
    }


    render() {
        let redirectVar = null;
        let errorPanel  = null;

        if (this.props.signupStateStore.result) {
            console.log('Inside props login', this.props.signupStateStore);
            if (this.props.signupStateStore.result.isNewUserCreated === true) {
                redirectVar = <Redirect to="/login" />
            }
            if (this.props.signupStateStore.result.errorRedirect === true) {
                redirectVar = <Redirect to="/error" />
            }
            

        }
        if(this.props.signupStateStore.duplicateUser === true){
            errorPanel = <div>
            <div className="alert alert-danger" role="alert">
                <strong>Validation Error!</strong> User Already exists!
            </div>
        </div>
        }
        

        const { handleSubmit } = this.props;

        return (
            <div>
                <Header />
                <div className="container">
                    {redirectVar}
                    <div className="container content">
                         <div className="login-container ">
                           

                            <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">                                
                                {errorPanel}
                                <div className="top">
                                   <div className="topInner">
                                        <p>Sign up</p>
                                    </div> 
                                <hr/>
                                </div>
                                <form name="signupForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                    <Field
                                        name="FirstName"
                                        id="firstname"
                                        type="text"
                                        placeholder="First name"
                                        component={this.renderField} />
                                    <Field
                                        name="Lastname"
                                        id="lastname"
                                        type="text"
                                        placeholder="Last name"
                                        component={this.renderField} />
                                    <Field
                                        name="Email"
                                        id="Email"
                                        type="email"
                                        placeholder="E-mail"
                                        component={this.renderField} />
                                    <Field
                                        name="Password"
                                        id="password"
                                        type="password"
                                        placeholder="Create password"
                                        component={this.renderField} />
                                    <div className="birthDayWrapper">
                                        <div className="monthWrapper">
                                            <label class="lableMonth" for="email-signupuser[birthday_month]">Month</label>
                                            <div className="birthDayMonth">
                                                <div class="_y9ev9r"><select id="email-signupuser[birthday_month]" name="user[birthday_month]" class="_bwyiq2l"><option disabled="" value="">Month</option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select></div>
                                            </div>
                                            </div>
                                            <div className="monthWrapper">
                                            <label class="lableMonth" for="email-signupuser[birthday_day]">Day</label>
                                            <div className="birthDayDate">

                                                <div class="_y9ev9r"><select id="email-signupuser[birthday_day]" name="user[birthday_day]" class="_bwyiq2l"><option disabled="" value="">Day</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select></div>    
                                            </div>
                                            </div>
                                            <div className="monthWrapper">
                                             <div className="uperlabel">   
                                            <label class="lableMonth" for="email-signupuser[birthday_day]">Day</label>
                                            <div className="birthDayYear">
                                                <div class="_y9ev9r"><select id="email-signupuser[birthday_year]" name="user[birthday_year]" class="_bwyiq2l"><option disabled="" value="">Year</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option><option value="1904">1904</option><option value="1903">1903</option><option value="1902">1902</option><option value="1901">1901</option><option value="1900">1900</option><option value="1899">1899</option></select></div>
                                            </div>
                                            </div>
                                            </div>
                                             
                                            {/* <label class="">BirthDate</label>
                                           <DatePicker className="form-control form-control-lg" dateFormat="MM/DD/YY" selected={this.state.BirthDate} onChange={this.handleAvailabilityStartDateChange} />
                                                 */}
                                        </div>
                                    <div className="form-group login-form-control">
                                        <button className="btn btn-login col-lg-12 col-md-12 col-sm-12" type="submit">Sign up </button>
                                    </div>
                                </form>

                                <hr />
                            <div>
                                <p>Already have an account? <span><a href="/login">Login</a></span></p>
                            </div>
                               
                            </div>
                        </div> 
                        {/* <div className="login-container signupOuter row">
                            <div className="col-lg-4 col-md-4 col-sm-4">

                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 signupMainOuter">
                                <div className="signupForm">
                                    <form className="formMain">
                                        <input type="email" className="" name="Email" placeholder="Email address"></input> 
                                        <input type="text" className="" name="FirstName" placeholder="Frist name"></input>
                                        <input type="text" className="" name="LastName" placeholder="Last name"></input>
                                        <input type="text" className="" name="Password" placeholder="Create Password"></input>
                                        <div className="birthDayWrapper">
                                            <div className="birthDayMonth">
                                                <div class="_y9ev9r"><select id="email-signupuser[birthday_month]" name="user[birthday_month]" class="_bwyiq2l"><option disabled="" value="">Month</option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select></div>
                                            </div>
                                            <div className="birthDayDate">
                                                <div class="_y9ev9r"><select id="email-signupuser[birthday_day]" name="user[birthday_day]" class="_bwyiq2l"><option disabled="" value="">Day</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select></div>    
                                            </div>
                                            <div className="birthDayYear">
                                                <div class="_y9ev9r"><select id="email-signupuser[birthday_year]" name="user[birthday_year]" class="_bwyiq2l"><option disabled="" value="">Year</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option><option value="1904">1904</option><option value="1903">1903</option><option value="1902">1902</option><option value="1901">1901</option><option value="1900">1900</option><option value="1899">1899</option></select></div>
                                            </div>

                                        </div>
                                        <div className="submitButton">
                                            <button type="submit" className="btn submit-btn" >signup</button>
                                        </div>
                                        
                                    </form>
                                </div>
                                
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4">
                                
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}


//This method provides access to redux store
const mapStateToProps = state => ({
    signupStateStore: state.signup
});

function validate(values) {
    console.log('inside vaidate');
    const errors = {};
    if (!values.firstname) {
        errors.firstname = "Enter your name";
    }
    if (!values.lastname) {
        errors.lastname = "Enter your lastname";
    }
    if (!values.email) {
        errors.email = "Enter E-mail";
    }
    if (!values.password) {
        errors.password = "Enter Password";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "signupForm"
})(connect(mapStateToProps, { signup })(Signup));
