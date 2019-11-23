import axios from "axios";
import {rooturl} from '../config/settings';
export const GET_PROFILE_DETAILS = "GET_PROFILE_DETAILS";
export const UPDATE_PROFILE_DETAILS = "UPDATE_PROFILE_DETAILS";
export const UPDATE_PROFILE_DETAILS_FAILURE = "UPDATE_PROFILE_DETAILS_FAILURE";
export const GET_PROFILE_DETAILS_FAILURE = "GET_PROFILE_DETAILS_FAILURE";

export function getProfileDetails() {
    return async function (dispatch) {

        console.log('Inside Get Profile Details');
        // axios.defaults.withCredentials = true;
        
        var ProfileImage = "";
        var result = {
            data : {},
            imageData : ""
        }
        var token = localStorage.getItem("token");
        var errorRedirect = false;
        var UserId=localStorage.getItem("UserId")
        // await axios.get('http://54.85.105.69:3000/profile/'+UserId)
        //     .then((response) => {
        //         console.log(response.data)
        //         result.data = response.data;
        //         ProfileImage = response.data.ProfileImage;
        //     })
        //     .catch((err)=>{
        //         errorRedirect = true;
        //         dispatch({
        //             type: GET_PROFILE_DETAILS_FAILURE,
        //             payload: errorRedirect
        //         }); 
                 
        //     });









        // console.log('ProfileImage', ProfileImage);
        // await axios.post('http://'+rooturl+':3001/download-file/' + ProfileImage , {
        //     headers: {"Authorization" : `Bearer ${token}`}
        // })
        //     .then(response => {
        //         result.imageData = 'data:image/jpg;base64, ' + response.data;

        //     }).catch((err)=>{
        //         errorRedirect = true;
        //         dispatch({
        //             type: GET_PROFILE_DETAILS_FAILURE,
        //             payload: errorRedirect
        //         }); 
                 
        //     });
        
        
        dispatch({
            type: GET_PROFILE_DETAILS,
            payload: result
        });        

    }
}


export function updateProfileDetails(data){
    return function(dispatch){
        console.log('Inside Update Profile Details');
        var token = localStorage.getItem("token");
        // axios.defaults.withCredentials = true;
        axios.post('https://sjgt1h8u4g.execute-api.us-east-1.amazonaws.com/prod/profile', data)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    dispatch({
                         type: UPDATE_PROFILE_DETAILS                         
                    });
                }
            })
            .catch((err) =>{
                if(err){
                    var errorRedirect = true;
                    console.log('in update catch');
                    dispatch({
                        type: UPDATE_PROFILE_DETAILS_FAILURE,
                        payload: errorRedirect                       
                   });
                }
            });
    }
}

