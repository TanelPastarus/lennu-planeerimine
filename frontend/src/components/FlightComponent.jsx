import React, {useEffect, useState} from 'react'
import {getAllFlights} from '../services/FlightService.js'
import {Link} from 'react-router-dom';
import '../App.css'
import {convertHours, hoursAndMinutes, options} from  '../services/Utility.js'

const FlightComponent = () => {

    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        getAllFlights().then((response) => {
            setFlights(response.data);
            setFilteredFlights(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const handleFilter = () => {
        let filtered = flights;
        if (origin) {
            filtered = filtered.filter(flight => flight.origin.toLowerCase().includes(origin.toLowerCase()));
        }

        if (destination) {
            filtered = filtered.filter(flight => flight.destination.toLowerCase().includes(destination.toLowerCase()));
        }

        if (date) {
            filtered = filtered.filter(flight => new Date(flight.departureTime).toDateString() === new Date(date).toDateString());
        }

        if (duration) {
            filtered = filtered.filter(flight => flight.durationMinutes <= parseInt(duration));
        }

        if (price) {
            filtered = filtered.filter(flight => flight.price <= parseFloat(price));
        }

        setFilteredFlights(filtered);
    };

    const resetFilter = () => {
        setOrigin('');
        setDestination('');
        setDate('');
        setDuration('');
        setPrice('');
        setFilteredFlights(flights);
    };

    return (
        <div>
            <h2>Flights</h2>
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Duration (minutes)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button className="button" onClick={handleFilter}>Filter</button>

                <button className="button" onClick={resetFilter}>Reset</button>
            </div>
            <div className="card-container">
                {filteredFlights.map(flight => (
                    <div className="card" key={flight.id}>
                        <div className="card-body">
                            <h3 className="card-title">{flight.origin} -&gt; {flight.destination}</h3>
                            <p className="card-text">Price: {flight.price} €</p>
                            <p className="card-text">Free seats: {flight.freeSeats}</p>
                            <p className="card-text">Duration: {convertHours(flight.durationMinutes)} {flight.durationMinutes % 60 > 0 ? flight.durationMinutes % 60 + " minutes" : ""}</p>
                            <p className="card-text">Date: {new Date(flight.departureTime).toLocaleDateString("en-US", options)} </p>
                            <p className="card-text">Departure: {hoursAndMinutes(flight.departureTime)}</p>
                            <p className="card-text">Arrival: {hoursAndMinutes(flight.arrivalTime)}</p>
                            <Link to={`/flights/${flight.id}`} className="button">Select flight</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default FlightComponent