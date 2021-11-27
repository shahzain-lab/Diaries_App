import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../App/rootReducer';
import Auth from '../features/auth/Auth';
import Home from '../features/home/Home';

function App() {

  const isLoggedIn = useSelector((state: RootState) => {
    return state.auth.isAuthenticated;
  })

  return (
    <Routes>
      {isLoggedIn ?
        <Route path="//*" element={<Home />} />
        :
        <Route path="/" element={<Auth />} />}
    </Routes>
  );
}

export default App;
