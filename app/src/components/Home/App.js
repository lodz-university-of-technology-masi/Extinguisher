import React, { Component } from 'react';
import '../style/App.css';
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route path="/home" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
