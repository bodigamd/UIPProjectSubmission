import {BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Navbar from './components/pages/Navbar';
import About from './components/pages/About';
import Profile from './components/pages/Profile';

import { UserProvider } from './Context/userContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<About />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
