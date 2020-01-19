import React, {Component} from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import Confirm from './alt/Confirm'
import AddTest from './pages/AddTest'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {AppProvider} from "./context/AppContext";
import UserPanel from './UserPanel/UserPanel'
import UserTestList from './UserPanel/UserTestList'
import UserTestView from './UserPanel/UserTestView'
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import YandexTranslation from "./yandex/YandexTranslation";

import RecruiterPanel from "./RecruiterPanel/RecruiterPanel"
import RecruiterPlankTestList from "./RecruiterPanel/RecruiterPlankTests/RecruiterPlankTestList"
import RecruiterPlankTestView from "./RecruiterPanel/RecruiterPlankTests/RecruiterPlankTestView"

import RecruiterAssignedTestList from "./RecruiterPanel/RecruiterAssignedTests/RecruiterAssignedTestsList"
import RecruiterCheckTestView from "./RecruiterPanel/RecruiterAssignedTests/RecruiterCheckTestView"

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <AppProvider>
                    <div className="App">
                        <Header/>
                        <main>
                            <YandexTranslation/>
                            <Switch>
                                <Route exact path="/" component={Main}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                {/*<Route exact path="/confirm" component={Confirm}/>*/}
                                <Route exact path="/logout" render={() => (<Redirect to="/"/>)}/>
                                <ProtectedRoute exact path="/addTest" component={AddTest}/>
                                <ProtectedRoute exact path="/userPanel" component={UserPanel}/>
                                {/* <ProtectedRoute exact path="/userTestList" component={UserTestList}/>
                                <ProtectedRoute exact path="/userTestView" component={UserTestView}/>
                                <ProtectedRoute exact path="/recruiterPanel" component={RecruiterPanel}/>
                                */}

                                <Route exact path="/userTestList" component={UserTestList}/>
                                <Route exact path="/userTestView" component={UserTestView}/>

                                <Route exact path="/recruiterPanel" component={RecruiterPanel}/>

                                <Route exact path="/recruiterPlankTestView" component={RecruiterPlankTestView}/>
                                <Route exact path="/recruiterPlankTestList" component={RecruiterPlankTestList}/>

                                <Route exact path="/recruiterAssignedTestList" component={RecruiterAssignedTestList}/>
                                <Route exact path="/recruiterCheckTestView" component={RecruiterCheckTestView}/>



                                <Route component={NotFound}/>
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
