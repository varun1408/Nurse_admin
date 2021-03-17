import React from 'react';
import AppContainer from './appcontainer.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";
import history from "./history.js";

const AppRouter = (props) => {
    return(
        <>
        <Provider store={Store}>
            <Router history={history}>
                <Route render={(props)=> <AppContainer {...props}/>} />
            </Router>
        </Provider>
        
    </>
    );
}


export default AppRouter;