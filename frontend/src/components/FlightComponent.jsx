import React, {useEffect, useState} from 'react'
import {getAllEmployees} from '../services/EmployeeService'

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
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Free seats</th>
                    <th>Duration</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                </tr>
                </thead>
                <tbody>
                {flights.map(flight =>
                <tr key={flight.id}>
                    <td>{flight.origin}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.price}</td>
                    <td>{flight.freeSeats}</td>
                    <td>{flight.durationMinutes}</td>
                    <td>{flight.departureTime}</td>
                    <td>{flight.arrivalTime}</td>
                </tr>)}
                </tbody>

            </table>
        </div>
    )
}
export default FlightComponent