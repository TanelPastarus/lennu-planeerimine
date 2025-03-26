import React, {useEffect, useState} from 'react'
import {getAllEmployees} from '../services/EmployeeService'
import { Link } from 'react-router-dom';
import '../flightComponentStyle.css'

const FlightComponent = () => {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getAllEmployees().then((response) => {
            setFlights(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);



    return (
        <div className="container">
            <h2>Flights</h2>
            <div className="card-container">
                {flights.map(flight => (
                    <div className="card" key={flight.id}>
                        <div className="card-body">
                            <h3 className="card-title">{flight.origin} -&gt; {flight.destination}</h3>
                            <p className="card-text">Price: {flight.price}</p>
                            <p className="card-text">Free seats: {flight.freeSeats}</p>
                            <p className="card-text">Duration: {flight.durationMinutes} minutes</p>
                            <p className="card-text">Departure: {flight.departureTime}</p>
                            <p className="card-text">Arrival: {flight.arrivalTime}</p>
                            <Link to={`/flights/${flight.id}`} className="button">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default FlightComponent