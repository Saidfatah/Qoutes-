import '../global style/App.css';
import {Provider} from 'react-redux'
import store from '../store/store'
import Login from '../Components/Auth/loging'
import SignUp from '../Components/Auth/signup'
import Sidebar from '../Components/Layout/sidebar/Sidebar'
import Toast from './Common/toast/Toast'
import QuoteForm from './Qoutes/QouteForm'
import QoutesHome from './Qoutes/QoutesHome'

const  App=()=> {
  return (
     <Provider store={store}>
       <Toast />
       <Sidebar />
       <Login />
       <SignUp />
       <QuoteForm />
       <QoutesHome />
     </Provider>
  );
}

export default App;
