import React, {useContext} from 'react';
import {AppContext} from "../context/AppContext";
import Main from '../components/Main'
import Login from '../components/Login'
import Register from '../components/Register'
import Confirm from '../pages/Confirm'
import AddTest from '../pages/AddTest'
import {Container} from "react-bootstrap";
import {BrowserRouter, Switch, Redirect} from 'react-router-dom'
import UserPanel from '../UserPanel/UserPanel'
import {AppProvider} from "../context/AppContext";
import UserTestList from '../UserPanel/UserTestList'
import UserTestView from '../UserPanel/UserTestView'
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import YandexTranslation from "../yandex/YandexTranslation";
import {Link, Route} from "react-router-dom";

 const Routes = () => {
    const {userp, auth} = useContext(AppContext);
    const [user, setUser] = userp;
    const [isAuthenticated, setIsAuthenticated] = auth;
    console.log(user)
    if(isAuthenticated){
    if(user.signInUserSession.idToken.payload['custom:role']=='recruiter')
    {
        console.log(user)
        return(
        <Switch>
        <Route exact path="/logout" render={() => (<Redirect to="/"/>)}/>
        <Route exact path="/login" component={Login}/>
        <ProtectedRoute exact path="/yandex" component={YandexTranslation}/>
        <ProtectedRoute exact path="/addTest" component={AddTest}/>
        <ProtectedRoute exact path="/userPanel" component={UserPanel}/>
        <ProtectedRoute exact path="/userTestList" component={UserTestList}/>
        <ProtectedRoute exact path="/userTestView" component={UserTestView}/>
        <Route exact path="/" component={Main}/>
        <Route component={NotFound}/>
        </Switch>)
}
    }
        return(
            <Switch>
            <ProtectedRoute exact path="/logout" render={() => (<Redirect to="/"/>)}/>
            <ProtectedRoute exact path="/yandex" component={YandexTranslation}/>
            <ProtectedRoute exact path="/userPanel" component={UserPanel}/>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/confirm" component={Confirm}/>
            <Route component={NotFound}/>
        </Switch>
    )
        }
export default Routes;
