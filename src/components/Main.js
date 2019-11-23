import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import OwnerSignup from './Signup/OwnerSignup';
import AddProperty from './ListProperty/AddProperty';
import DisplayProperties from './DisplayProperties/DisplayProperties';
import PropertyDisplay from './DisplayProperties/PropertyDisplay';
import Profile from './Profile/Profile';
import MyTrips from './MyTrips/MyTrips';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';
import Error from './Error/Error';
import OwnerInbox from './Inbox/OwnerInbox';
import TravelerInbox from './Inbox/TravelerInbox';
import moment from 'moment';

class Main extends Component{

    constructor(props){
        super(props);
        this.state={
            isSearch : false,
            searchStartDate : moment(),
            searchEndDate : moment(),
            searchText: "",
            guests:2
        }

        this.handlesearchClick = this.handlesearchClick.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);

    }

    handlesearchClick = () => {
        
        this.setState({
            isSearch : true            
        })
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

    handleInputChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name] : value
        });
    }

    render(){

        

        return(
            <div>
                {/** Render Different Components based on ROute*/}
                <Route exact path="/" component={Home}/>
                <Route path="/home" component={Home}  />
                <Route path="/login" component={Login} />               
                <Route path="/sign-up" component={Signup} />
                <Route path="/owner-sign-up" component={OwnerSignup} />
                <Route path="/add-property" component={AddProperty} />                
                <Route  path="/display-properties" component={DisplayProperties}/>
                <Route path="/property-display/:id" component={PropertyDisplay} />
                <Route path="/profile" component={Profile} />
                <Route path="/owner-dashboard" component={OwnerDashboard} />
                <Route path="/my-trips" component={MyTrips} />
                <Route path="/owner-inbox" component={OwnerInbox} />
                <Route path="/traveler-inbox" component={TravelerInbox} />
                <Route path='/error' component={Error} />
            </div>
        )
    }

}

export default Main