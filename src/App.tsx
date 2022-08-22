import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components and Routes import:
import HomeRoute from './Routes/home';
import ErrorPage from './Routes/ErrorPage';
import Navbar from './components/Navbar';

function App() {
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