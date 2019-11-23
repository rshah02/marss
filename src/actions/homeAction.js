export const SAVE_SEARCH_DETAILS_TO_STORE = "SAVE_SEARCH_DETAILS_TO_STORE";

export function saveSearchDetailsToStore(data){
    return function(dispatch){
        var result = {
            City:data.City,
            isSearch : true
        }
        
        dispatch({
            type: SAVE_SEARCH_DETAILS_TO_STORE,
            payload: result
        });
    }
}