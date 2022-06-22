import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// imports regarding State
import { addActiveTodo } from './features/ActiveTodosSlice';
import { RootState } from './app/store';

// Components and Routes import:
import HomeRoute from './Routes/home';
import ErrorPage from './Routes/ErrorPage';
import Navbar from './components/Navbar';

function App() {
  const activeTodos = useSelector((state: RootState) => state.activeTodos.value)
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomeRoute /> } />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;