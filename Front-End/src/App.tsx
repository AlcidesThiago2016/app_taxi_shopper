import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PtravelRequest from "./pages/PtravelRequest";
import PtravelOptions from "./pages/PtravelOptions";
import PtravelHistory from "./pages/PtravelHistory";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PtravelRequest/>} />
        <Route path="/options" element={<PtravelOptions/>}></Route>
        <Route path="/history" element={<PtravelHistory/>}></Route>
      </Routes>
    </Router>
  )
}
export default App;
