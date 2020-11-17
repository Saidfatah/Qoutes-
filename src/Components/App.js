import React, {useEffect} from 'react'
import '../global style/App.css';
import Auth from '../Components/Auth/Auth'
import Sidebar from '../Components/Layout/sidebar/Sidebar'
import Toast from './Common/toast/Toast'
import UserProfilRouter from './User/UserProfilRouter'
import QuotesHome from './Qoutes/QuotesHome'
import Redirect from './Common/Redirect/Redirect'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { connect } from 'react-redux';

const  App=({checkAuth,IsAuthenticated})=> {

    useEffect(() => {
      checkAuth()
   }, [checkAuth])

  
  return (
     <>
      <Router>
          <Toast />
          { IsAuthenticated? <Sidebar />:null }
         <Redirect />
          <Switch>
             <Route exact path="/" children={<QuotesHome />} />
             <Route exact path="/profile/:id" children={<UserProfilRouter />} />
             <Route exact path="/auth" children={<Auth />} />
          </Switch>
      </Router>
     </>
  );
}

export default connect(
   state=>({
      IsAuthenticated:state.auth.IsAuthenticated,
      user:state.auth.user
   }),
   dispatch=>({checkAuth:dispatch.auth.checkAuth}))
(App);
