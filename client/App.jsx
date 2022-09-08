import React, { Component } from 'react';
import HomeContainer from './containers/HomeContainer';
import { MainContainer } from './containers/MainContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import{ TeacherContainer} from './containers/TeacherContainer'
class App extends Component {
  constructor() {
    super();
    this.state = { login: true, signup: true };
  }
  render() {
    const { login, signup } = this.state; // ML is this not necessart with RTK?
    return (
      // <h1>Welcome to PT Conferences</h1>
      <Router> {/* SA This enables routing from login/signup page to schedule page without sending a request to the server */}
        <Routes>
          <Route exact path="/" element={<HomeContainer login={login} signup={signup} />} />
          
          {/* <Route exact path="/schedule" element={<MainContainer studentId={'studentId'}/>} /> */}
          <Route exact path="/schedule" element={<MainContainer />} />
          <Route exact path="/teacherhome" element={<TeacherContainer />} />
         
        </Routes>
      </Router>
      // <HomeContainer login={login} signup={signup} />
    );
  }
}

export default App;
