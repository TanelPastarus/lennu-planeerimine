import './App.css'
import FlightComponent from "./components/FlightComponent.jsx";
import FlightDetail from './components/FlightDetail.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<FlightComponent />} />
          <Route path="/flights/:id" element={<FlightDetail />} />
        </Routes>
      </Router>
  )
}

export default App
