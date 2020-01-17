import React, {Component} from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import Confirm from './pages/Confirm'
import AddTest from './pages/AddTest'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {AppProvider} from "./context/AppContext";
import UserPanel from './UserPanel/UserPanel'
import UserTestList from './UserPanel/UserTestList'
import UserTestView from './UserPanel/UserTestView'
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import YandexTranslation from "./yandex/YandexTranslation";
import UsersList from "./UserPanel/UsersList"

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
                                <Route exact path="/confirm" component={Confirm}/>
                                <Route exact path="/logout" render={() => (<Redirect to="/"/>)}/>
                                <Route exact path="/yandex" component={YandexTranslation}/>
                                <ProtectedRoute exact path="/addTest" component={AddTest}/>
                                <ProtectedRoute exact path="/userPanel" component={UserPanel}/>
                                <ProtectedRoute exact path="/userTestList" component={UserTestList}/>
                                <ProtectedRoute exact path="/userTestView" component={UserTestView}/>
                                <ProtectedRoute exact path="/usersList" component = {UsersList}/>
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
