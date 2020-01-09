import React, {useState, createContext,Component} from 'react';
import {Auth} from "aws-amplify";

export const AppContext = createContext();



export const AppProvider = props => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <AppContext.Provider value={{userp: [user, setUser], auth: [isAuthenticated, setIsAuthenticated]}}>
            {props.children}
        </AppContext.Provider>
    );
};

export const AppConsumer = AppContext.Consumer;

// // wersja z logowaniem, niedziala
// export class AppProvider extends Component {
//     state = {
//         user: null,
//         isAuthenticated: false
//     };

//     login = async (email, password) => {
//         return await Auth.signIn(email, password)
//             .then(user => {
//                 console.log(user);
//                 this.setState({user, isAuthenticated: true})
//             })
//     };
//     logout = async () => {
//         return await Auth.signOut()
//             .then(data => {
//                 console.log(data);
//                 this.setState({
//                     user: null,
//                     isAuthenticated: false
//                 })
//             })
//     };

//     render() {
//         const {user, isAuthenticated} = this.state;
//         return (
//             <AppContext.Provider
//                 value={{user: user, isAuthenticated: isAuthenticated, login: this.login(), logout: this.logout()}}>
//                 {this.props.children}
//             </AppContext.Provider>
//         );
//     }
// }