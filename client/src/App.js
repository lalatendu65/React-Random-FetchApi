
import './App.css';
import ProfileList from './component/ProfileList';
import Dashboard from './component/Dashboard';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={ProfileList} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
