
import React, { Component } from 'react';
import '../style/App.css';
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import Confirm from './Confirm'
import AddTest from './AddTest'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify';


class App extends Component {
  state = {
    isAuthenticated: false,
    user: null
  }

  setAuth = (auth) => {
    this.setState(
      {
        isAuthenticated: auth
      }
    )
  }

  setUser = (user) => {
    this.setState(
      {
        user: user
      }
    )
  }

  logout = async () => {
    await Auth.signOut();
    this.setAuth(false);
  }


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header auth={this.state.isAuthenticated} logout={this.logout} />
          <main>
            <Switch>
              <Route exact path="/" render={(setAuth) => (<Main user={this.state.user} />)} />
              <Route exact path="/login" render={() => (<Login auth={this.setAuth} user={this.setUser} />)} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/logout" render={() => (<Redirect to="/" />)} />
              <Route exact path="/confirm" component={Confirm} />
              <Route exact path="/addTest" component={AddTest} />
            </Switch>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
