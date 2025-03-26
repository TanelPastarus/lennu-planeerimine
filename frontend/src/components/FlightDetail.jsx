import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFlightById } from '../services/EmployeeService';

const FlightDetail = () => {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);

    useEffect(() => {
        getFlightById(id).then((response) => {
            setFlight(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    if (!flight) {
        return <div>Loading...</div>;
    }

    const seats = JSON.parse(flight.jsonSeats);
    const rowGapLocation = seats.length / 2;
    const columnGapLocation = seats[0].length / 2;

    return (
        <div className="container" style={{paddingTop: '10px', color:"black"}}>
            <h2>Flight Details</h2>
            <p>Origin: {flight.origin}</p>
            <p>Destination: {flight.destination}</p>
            <p>Price: {flight.price}</p>
            <p>Free seats: {flight.freeSeats}</p>
            <p>Duration: {flight.durationMinutes} minutes</p>
            <p>Departure: {flight.departureTime}</p>
            <p>Arrival: {flight.arrivalTime}</p>

            <div className="seats-grid">
                {seats.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                    {rowIndex === rowGapLocation && <div className={"row-gap"}> <p className={"exit1"}>EXIT |</p> <p className={"exit2"}>| EXIT</p></div>}
                    <div className="seats-row">
                        {row.map((seat, seatIndex) => (
                            <React.Fragment key={seatIndex}>
                            {seatIndex === columnGapLocation && <div className={"seat-gap"}> </div>}
                            <div key={seatIndex} className={`seat ${seat === 1 ? 'taken' : 'free'}`}>
                                {seat === 1 ? 'X' : 'O'}
                            </div>
                            </React.Fragment>
                        ))}
                    </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default FlightDetail;