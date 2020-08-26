import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './ui/HomePage/Header';
import { Route, withRouter, Switch } from 'react-router-dom';
import LoginPage from './ui/SignUser/Login';
import Signup from './ui/SignUser/Signup';
import { connect } from 'react-redux';
import { compose } from 'redux';
import UserPage from './ui/UserPage/UserPage';
import LaunchContest from './ui/ContestType/LaunchContest';
import ContestEdit from './ui/UserPage/ContestEdit';
import ContestList from './ui/ContestList/Contest.List';
import { thisUser } from './redux/auth-reducer';
import PayForm from './ui/ContestType/PayForm';
import Logout from './ui/SignUser/Logout';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    if (localStorage.getItem('jwtToken')) this.props.thisUser();
  }


  render () {
    // console.log(this.props.isAuth);


    return (
      <div className="App">
        <Header />
        <Switch >
          <Route exact path='/profile' render={() => <UserPage />} />
          <Route path='/profile/dashboard/:id' render={() => <ContestEdit />} />
          <Route path='/login' render={() => <LoginPage />} />
          <Route path='/logout' render={() => <Logout />} />
          <Route path='/signup' render={() => <Signup />} />
          <Route path='/contestlist' render={() => <ContestList />} />
          <Route path='/launchcontest' render={() => <LaunchContest />} />
        </Switch>
      </div>
    );
  }

}



export default compose(
  withRouter,
  connect(null, { thisUser })
)(App)
