import React, {useEffect, useState} from 'react'
import {getBoughtFlights} from '../services/FlightService.js'
import { Link } from 'react-router-dom';
import '../flightComponentStyle.css'

const BoughtFlightComponent = () => {

    const [boughtFlights, setBoughtFlights] = useState([]);

    useEffect(() => {
        getBoughtFlights().then((response) => {
            setBoughtFlights(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const convertHours = (minutes) => {
        const hours = Math.floor(minutes / 60);

        if (hours > 1) return hours + " hours";
        if (hours > 0) return 1 + " hour";
        return "";
    }

    const hoursAndMinutes = (date) => {
        const convertedDate = new Date(date);
        let hours = convertedDate.getHours();
        let minutes = convertedDate.getMinutes();

        if (hours === 0) hours += "0";
        if (minutes === 0) minutes += "0";

        return hours + ":" + minutes;
    }

    return (
    <div className="card-container">
        {boughtFlights.map(boughtFlight => (
            <div className="card" key={boughtFlight.id}>
                <div className="card-body">
                    <h3 className="card-title">{boughtFlight.flight.origin} -&gt; {boughtFlight.flight.destination}</h3>
                    <p className="card-text">Price: {boughtFlight.flight.price}</p>
                    <p className="card-text">Free seats: {boughtFlight.flight.freeSeats}</p>
                    <p className="card-text">Duration: {convertHours(boughtFlight.flight.durationMinutes)} {boughtFlight.flight.durationMinutes % 60 > 0 ? boughtFlight.flight.durationMinutes % 60 + " minutes" : ""}</p>
                    <p className="card-text">Date: {new Date(boughtFlight.flight.departureTime).toLocaleDateString("en-US", options)} </p>
                    <p className="card-text">Departure: {hoursAndMinutes(boughtFlight.flight.departureTime)}</p>
                    <p className="card-text">Arrival: {hoursAndMinutes(boughtFlight.flight.arrivalTime)}</p>
                    <div className="card" key={boughtFlight.ticketList.id}>
                    <p className="card-text">Row: {boughtFlight.ticketList.row}</p>
                    <p className="card-text">Seat: {boughtFlight.ticketList.seat}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
    )
}

export default BoughtFlightComponent