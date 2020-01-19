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
import DisplayAllCandidates from "./RecruiterPanel/DisplayAllCandidates";

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
                                <Route exact path="/yandex" component={YandexTranslation}/>
                                <ProtectedRoute exact path="/addTest" role="recruiter" component={AddTest}/>
                                <ProtectedRoute exact path="/userPanel" role="candidate" component={UserPanel}/>

                                <ProtectedRoute exact path="/userTestList"
                                       role="candidate"
                                       component={UserTestList}/>
                                <ProtectedRoute exact path="/userTestView"
                                       role="candidate"
                                       component={UserTestView}/>
                                       
                                <ProtectedRoute exact path="/users"
                                                role="recruiter"
                                                component={DisplayAllCandidates}/>
                                <ProtectedRoute exact path="/recruiterPanel"
                                       role="recruiter"
                                       component={RecruiterPanel}/>

                                <ProtectedRoute exact path="/recruiterPlankTestView"
                                       role="recruiter"
                                       component={RecruiterPlankTestView}/>
                                <ProtectedRoute exact path="/recruiterPlankTestList"
                                       role="recruiter"
                                       component={RecruiterPlankTestList}/>

                                <ProtectedRoute exact path="/recruiterAssignedTestList"
                                       role="recruiter"
                                       component={RecruiterAssignedTestList}/>
                                <ProtectedRoute exact path="/recruiterCheckTestView"
                                       role="recruiter"
                                       component={RecruiterCheckTestView}/>


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
