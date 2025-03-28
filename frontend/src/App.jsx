import './App.css'
import FlightComponent from "./components/FlightComponent.jsx";
import FlightDetail from './components/FlightDetail.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BoughtFlightComponent from "./components/BoughtFlightComponent.jsx";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<FlightComponent />} />
          <Route path="/flights/:id" element={<FlightDetail />} />
            <Route path="/bought-flights" element={<BoughtFlightComponent />} />
        </Routes>
      </Router>
  )
}

export default App
