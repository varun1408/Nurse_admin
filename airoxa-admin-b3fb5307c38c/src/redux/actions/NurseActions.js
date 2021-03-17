import history from "../../history.js";
import nurseService from "../../services/nurseService";

export const NURSE_LOADING = "NURSE_LOADING";
export const GET_NURSES_DATA = "GET_NURSES_DATA";
export const ADD_NURSE_SUCCESS = "ADD_NURSE_SUCCESS";
export const ADD_NURSE_ERROR = "ADD_NURSE_ERROR";
export const DELETE_NURSE_SUCCESS = "DELETE_NURSE_SUCCESS";
export const DELETE_NURSE_ERROR = "DELETE_NURSE_ERROR";
export const IMPORT_NURSE_LOADING = "IMPORT_NURSE_LOADING";
export const IMPORT_NURSE_SUCCESS = "IMPORT_NURSE_SUCCESS";
export const IMPORT_NURSE_ERROR = "IMPORT_NURSE_ERROR";

export function getNurses(params){
  return dispatch =>{
    dispatch({
      type: NURSE_LOADING
    });
    nurseService.getNurses(params)
    .then((resp)=>{
      dispatch({
        type:GET_NURSES_DATA,
        payload:resp
      });
    });
  }
}

export function addNurse(data) {
  return dispatch => {
    return nurseService.addNurse(data)
    .then((resp)=>{
      dispatch({
        type: ADD_NURSE_SUCCESS
      });
    })
    .catch((err)=>{
      dispatch({
        type:ADD_NURSE_ERROR,
        payload: err.response
      });
    });
  }
}

export function importNurses(data) {
  return dispatch => {
    dispatch({
      type: IMPORT_NURSE_LOADING
    });
    return nurseService.importNurses(data)
    .then((resp)=>{
      dispatch({
        type: IMPORT_NURSE_SUCCESS
      });
    })
    .catch((err)=>{
      dispatch({
        type:IMPORT_NURSE_ERROR,
        payload: err.response
      });
    });
  }
}

export function deleteNurse(id) {
  return dispatch => {
    dispatch({
      type: NURSE_LOADING
    });
    nurseService.deleteNurse(id)
    .then((resp)=>{
      dispatch({
        type: DELETE_NURSE_SUCCESS,
        id: id
      });
    }).catch((err)=>{
      console.error('err: ', err);
      dispatch({
        type: DELETE_NURSE_ERROR,
        id: id
      });
    })

  };
}
