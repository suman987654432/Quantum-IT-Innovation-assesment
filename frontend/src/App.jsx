import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/Home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
