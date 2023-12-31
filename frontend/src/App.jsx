import React, { useState } from 'react';
import Header from './components/navbarComponents/Header';
import Login from './components/loginPages/login';
import Alert from './components/alertPage/Alert';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Verify from './components/loginPages/Verify';
import Profile from './components/profilePageComponents/Profile';
import axios from 'axios';
import url from './url';
import CreateGroup from './components/GroupsComponents/CreateGroup';
import FetchGroups from './components/GroupsComponents/FetchGroups';
import GroupDetails from './components/GroupsComponents/GroupDetails';
import SearchGroups from './components/GroupsComponents/searchGroups';
import AcceptRequest from './components/GroupsComponents/AcceptRequest';

export const MyContext = React.createContext();


function App() {
  const [alert, updateAlert] = useState({
    bg: 'yellow',
    content: 'Login before you start',
    display: 'hidden',
  });

  const [user, updateUser] = useState({
    name: '',
    _id: '',
  });

  const getUser = async ()=>{
    const userId = localStorage.getItem("task-id")
    
    if(userId){
      try{
        let user = await axios.post(`${url}/login/sessionedUser`,{id:userId})
        
        user = JSON.parse(user.data)
        
        updateUser({_id:user._id,name:user.username})
        updateAlert({bg:"green",content:`logged in as ${user.username}`,display:"show"})
      }catch(err){
        updateAlert({bg:"red",content:"session Timed out",display:"show"})
      }
    }else{
      updateAlert({bg:"yellow",content:"Please login!",display:"show"})
    }
  }

  return (
    <>
      <Router>
        <MyContext.Provider value={{ updateAlert, updateUser, user,getUser }}>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<Verify/>} />
            <Route path='/user' element={<Profile/>}/>
            <Route path='/create' element={<CreateGroup/>} />
            <Route path='/groups' element={<FetchGroups/>} />
            <Route  path='/groups/:id' element = {<GroupDetails/>}/>
            <Route  path='/search' element = {<SearchGroups/>}/>
            <Route path='/:id/:id/accept' element={<AcceptRequest/>}   />
          </Routes>
          <Alert alert={alert} />
        </MyContext.Provider>
      </Router>
    </>
  );
}

export default App;
