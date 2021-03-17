import axios from "axios";

class nurseService {
  getNurses = (params) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `nurses`,{params})
    .then((resp)=>{
      return resp.data
    })
  };

  addNurse = (data) => {
    return axios.post(process.env.REACT_APP_SERVER_URL + `nurses`,data)
    .then((resp)=>{
      return resp.data
    }).catch((e) => {
      console.log(e)
    })
  };

  deleteNurse = (id) => {
    return axios.delete(process.env.REACT_APP_SERVER_URL+`nurses/${id}`)
    .then((resp)=>{
      return resp.data
     })
  };

  importNurses = (data) => {
    return axios.post(process.env.REACT_APP_SERVER_URL + `nurses/import`,data)
    .then((resp)=>{
      return resp.data
    })
  }
}

export default new nurseService();
