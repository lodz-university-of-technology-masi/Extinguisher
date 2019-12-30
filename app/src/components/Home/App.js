import React, {Component} from 'react';
import '../style/App.css';
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import Confirm from './Confirm'
import AddTest from './AddTest'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {AppProvider} from "../context/AppContext";

class App extends Component {

    render() {
        return (
             <BrowserRouter>
                 <AppProvider>
                    <div className="App">
                        <Header/>
                        <main>
                            <Switch>
                                <Route exact path="/" component={Main}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/logout" render={() => (<Redirect to="/"/>)}/>
                                <Route exact path="/confirm" component={Confirm}/>
                                <Route exact path="/addTest" component={AddTest}/>
                            </Switch>
                        </main>
                        <Footer/>
                    </div>
                 </AppProvider>
             </BrowserRouter>
        );
    }
}

export default App;
