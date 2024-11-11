import React from 'react';
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import CardStack from './components/CardStack';
import NavBar from './components/NavBar';
import { colors } from './styles/theme';
import './App.css';

const styles = {
  pageContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray.lighter,

  },
  contentWrapper: {
    width: '390px',
    height: '844px',
    position: 'relative',
    backgroundColor: colors.white,
    overflow: 'auto' // Changed from 'hidden' to 'auto'
  }
};

function App() {
  const location = useLocation();
  const hideNavBarPaths = ['/login', '/register'];
  const shouldShowNavBar = !hideNavBarPaths.includes(location.pathname);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse" element={<CardStack />} />
          <Route exact path="/register" element={<Register />} />
          {/* ... other routes ... */}
        </Routes>
        {shouldShowNavBar && <NavBar />}
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}