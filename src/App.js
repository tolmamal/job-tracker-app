import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from './containers/Dashboard/Dashboard';
import HomePage from './components/HomePage/HomePage';
import Login from './containers/Registresion/Login/Login';
import Signup from './containers/Registresion/Signup/Signup';
import ViewJob from './containers/ViewJob/ViewJob';
import AccountInfo from './components/Account/AccountInfo';
import ProZone from './containers/ProZone/ProZone';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserAnalysis from './containers/UserAnalysis/UserAnalysis';
import AnalysisTable from './containers/AnalysisTable/AnalysisTable';
import Mail from './components/Mail/Mail';
import { makeStyles } from "@material-ui/core/styles";
import { verifyAuth } from "./store/actions";



const useStyles = makeStyles(() => ({
  app: {
    fontSize: '16px',
    color: 'rgb(127, 127, 127)',
    height: '100vh',
  },
  progress: {
    position: 'fixed',
    width: '100%',
    zIndex: '10',
  },
}));

function AppRouter () {
  const classes = useStyles();
  const auth = useSelector(state => state.auth);
  const user = useSelector((state) => state.user);
  const {user: {user: {uid} = {}}} = auth;
  const { isAuthenticated, isVerifying } = auth;
  const [firebaseInit, setFirebaseInit] = useState(false);
  const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(verifyAuth());
  // }, []);


  return (
      <Router>
        <div className={classes.app}>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/application/:applicationId" component={ViewJob} />
            <Route path="/account" component={AccountInfo} />
            {/*<Route path="/analysis" component={UserAnalysis} />*/}
            <Route path="/analysis" component={AnalysisTable} />
            <Route path="/pro-zone" component={ProZone} />
            <Route path="/send-mail" component={Mail} />
          </Switch>
        </div>
      </Router>
  )
}


const App = () => {
  return (
      <div className="App">
        <AppRouter />
      </div>
  );
};



export default App;
