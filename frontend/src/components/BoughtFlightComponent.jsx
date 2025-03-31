import React, {useEffect, useState} from 'react'
import {getBoughtFlights} from '../services/FlightService.js'
import {convertHours, hoursAndMinutes, options} from  '../services/Utility.js'
import '../App.css'

const BoughtFlightComponent = () => {

    const [boughtFlights, setBoughtFlights] = useState([]);

    useEffect(() => {
        getBoughtFlights().then((response) => {
            setBoughtFlights(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);


    return (
        <>
        {boughtFlights.length === 0 &&
        <div className="card-container">
            <div className="card"><p className="card-text"> No flights have been purchased!</p></div>
        </div>}
    <div className="card-container">
        {boughtFlights.map(boughtFlight => (
            <div className="card" key={boughtFlight.id}>
                <div className="card-body">
                    <h3 className="card-title">{boughtFlight.flight.origin} -&gt; {boughtFlight.flight.destination}</h3>
                    <p className="card-text">Price: {boughtFlight.flight.price} €</p>
                    <p className="card-text">Free seats: {boughtFlight.flight.freeSeats}</p>
                    <p className="card-text">Duration: {convertHours(boughtFlight.flight.durationMinutes)} {boughtFlight.flight.durationMinutes % 60 > 0 ? boughtFlight.flight.durationMinutes % 60 + " minutes" : ""}</p>
                    <p className="card-text">Date: {new Date(boughtFlight.flight.departureTime).toLocaleDateString("en-US", options)} </p>
                    <p className="card-text">Departure: {hoursAndMinutes(boughtFlight.flight.departureTime)}</p>
                    <p className="card-text">Arrival: {hoursAndMinutes(boughtFlight.flight.arrivalTime)}</p>
                    <p className="card-text"><strong>Tickets: </strong></p>
                    {boughtFlight.ticketList.map((ticket, index) => (
                        <div className="ticket" key={index}>
                            <p className="ticket-text">Row: {ticket.row + 1}</p>
                            <p className="ticket-text">Seat: {ticket.seat + 1}</p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
        </>
    )
}

export default BoughtFlightComponent