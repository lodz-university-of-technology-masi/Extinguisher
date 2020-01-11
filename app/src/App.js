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
import Routes from "./components/Routes"

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <AppProvider>
                    <div className="App">
                        <Header/>
                        <main>
                            <Routes></Routes>
                        </main>
                        <Footer/>
                    </div>
                </AppProvider>
            </BrowserRouter>
        );
    }
}

export default App;
