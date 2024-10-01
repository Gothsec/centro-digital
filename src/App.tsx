// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/admin/Login'
import Home from './components/Home';
import Dashboard from './components/admin/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
