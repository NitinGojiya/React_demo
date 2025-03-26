import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Details from './Components/Details';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice.js';
import Footer from './Components/Footer.jsx';

function App() {
  const user = useSelector(selectUser);
  const pathname = window.location.pathname;
  
  const pageNames = {
    '/login': 'Login',
    '/': 'Home',
    '/signup':'Signup',
    '/details':'Details'
  };
  const currentPageName = pageNames[pathname] || 'Unknown Page';
  return (
    <>
      <Navbar currentPageName={currentPageName} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={user? <Details />:<Login />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/details"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
