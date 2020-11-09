import React, {useEffect} from 'react'
import '../global style/App.css';
import Login from '../Components/Auth/loging'
import SignUp from '../Components/Auth/signup'
import Sidebar from '../Components/Layout/sidebar/Sidebar'
import Toast from './Common/toast/Toast'
import QuoteForm from './Qoutes/QouteForm'
import QoutesHome from './Qoutes/QoutesHome'
import { connect } from 'react-redux';

const  App=({checkAuth})=> {
    useEffect(() => {
      checkAuth()
   }, [])

  return (
     <>
       <Toast />
       <Sidebar />
       <Login />
       <SignUp />
       <QuoteForm />
       <QoutesHome />
     </>
  );
}

export default connect(null,dispatch=>({checkAuth:dispatch.auth.checkAuth}))(App);
