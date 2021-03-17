import { combineReducers } from "redux";
import NurseReducer from "./NurseReducer";

const AppReducer = combineReducers({
  nurse: NurseReducer
});

const RootReducer = (state,action)=>{
  if(action.type === 'USER_LOGGED_OUT'){
       state = undefined
   }
   return AppReducer(state,action)
}

export default RootReducer;
