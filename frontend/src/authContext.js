import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    logIn: () => { },
    logOut: () => { }
});

export default AuthContext;
