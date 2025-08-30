import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";      
import Detail from "./pages/Detail";  
import CreatePost from "./pages/CreatePost"; 

function App() {
  return (
    <Router>
  
      <Routes>
        <Route path="/" element={<Home />} />               
        <Route path="/create" element={<CreatePost />} /> 
        <Route path="/edit/:id" element={<Detail />} />
  
      </Routes>
    </Router>
  );
}

export default App;
