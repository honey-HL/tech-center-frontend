import  {combineReducers} from 'redux';


let data = (data = [], action) => {
    console.log(data,action)
    switch(action.type) {
        case 'getActiveTab': return [action.active_item];
        default: return data;
    }
   
}
let reducer = combineReducers({data});


export default reducer