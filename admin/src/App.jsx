import React from "react";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import Admin from "./pages/admin/admin";

const App = () => {
  return (
    <div>
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
