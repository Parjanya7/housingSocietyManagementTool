import React, {useState, useEffect } from 'react';
import './App.css';
import './Styles/app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './Components/Login'
import AdminMain from './Components/Admin/AdminMain';
import axios from 'axios';
import AdminOrMemberSignUp from './Components/AdminOrMemberSignUp';
import MemberMain from './Components/Member/MemberMain';

function App() {

  const [ user, setUser ] = useState('');

  useEffect( ()=>{

    axios.get('/current')
    .then( res => console.log( res.data ));
  }, []);

  const updateUser = ( user ) => {

    setUser( user );
  };

  const adminMatch = {
    url: '/AdminMain'
  };

  const memberMatch = {
    url: '/MemberMain'
  };

  const match2 = {
    url: '/SignUp'
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path = '/' component = { () => <Login user = {user} updateUser = {updateUser} /> } />
          <Route path = '/SignUp' component = { () => < AdminOrMemberSignUp user = {user} updateUser = {updateUser} match = {match2}/> } />
          <Route path = '/AdminMain' component = {() => < AdminMain user = {user} match = {adminMatch} updateUser = {updateUser}/>} />
          <Route path = '/MemberMain' component = { () => <MemberMain user = {user} match = {memberMatch} updateUser = {updateUser}/>}/>
        </Switch>
      </Router>    
    </div>
  );
}

export default App;
