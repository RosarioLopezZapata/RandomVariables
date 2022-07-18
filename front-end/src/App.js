import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Graphic from './pages/graphic';
import LogIn from './pages/login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/logged/:id" element={<Graphic />} />
      </Routes>
    </div>
  );
}

export default App;
