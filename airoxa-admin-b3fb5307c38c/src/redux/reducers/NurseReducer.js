import {
  NURSE_LOADING,
  GET_NURSES_DATA,
  ADD_NURSE_SUCCESS,
  ADD_NURSE_ERROR,
  DELETE_NURSE_SUCCESS,
  IMPORT_NURSE_LOADING,
  IMPORT_NURSE_SUCCESS,
  IMPORT_NURSE_ERROR
} from "../actions/NurseActions";

const initialState = {
  nurseLoading:true,
  importNurseLoading: false,
  NurseList: {}
};
  
const NurseReducer = function(state = initialState, action) {
  switch (action.type) {
    case NURSE_LOADING:{
      return{
        ...state,
        nurseLoading:true
      }
    }
    case GET_NURSES_DATA:{
      return{
        ...state,
        NurseList: {...action.payload},
        nurseLoading:false,
      }
    }
    case ADD_NURSE_SUCCESS: {
      return {
        ...state,
        nurseLoading:false,
        success: true
      }
    }
    case ADD_NURSE_ERROR: {
      return {
        ...state,
        nurseLoading: false,
        error: action.payload
      }
    }
    case DELETE_NURSE_SUCCESS: {
      const nurseList = state.NurseList
      nurseList.results = nurseList.results.filter(nurse => nurse.id !== action.id)
      --nurseList.totalResults;
      const returnData = {
        ...state,
        NurseList: nurseList,
        nurseLoading:false,
      }
      return returnData
    }
    case IMPORT_NURSE_LOADING: {
      return {
        ...state,
        importNurseLoading: true
      }
    }
    case IMPORT_NURSE_SUCCESS: {
      return {
        ...state,
        importNurseLoading: false,
        importNurseSuccess: true
      }
    }
    case IMPORT_NURSE_ERROR: {
      return {
        ...state,
        importNurseLoading: false,
        importNurseSuccess: false,
        importNurseError: action.payload
      }
    }
    default: {
      return state;
    }
  }
};
  
export default NurseReducer;