import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import Login from "./Pages/Admin/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Navbar />
      {isLoggedIn ? <Admin /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
