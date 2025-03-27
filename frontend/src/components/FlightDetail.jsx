import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFlightById } from '../services/EmployeeService';

const FlightDetail = () => {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [recommendedSeats, setRecommendedSeats] = useState([]);
    const [numSeats, setNumSeats] = useState(1);

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


    const recommendSeats = (seats, numSeats = 1) => {

        const seatScores = seats.map((row, rowIndex) =>
            row.map((seat, seatIndex) => {
                if (seat === 1) return null;

                let score = 0;

                // Window seat
                if (seatIndex === 0 || seatIndex === row.length - 1) score += 3;
                // Extra legroom
                if (rowIndex === 0 || rowIndex === rowGapLocation) score += 2;
                // Close to exit
                if (rowIndex === rowGapLocation - 1 || rowIndex === rowGapLocation) score += 2;

                return { rowIndex, seatIndex, score } // Higher score for closer seats
            })
        ).flat().filter(seat => seat !== null);

        // Sort seats by distance in ascending order
        seatScores.sort((a, b) => b.score - a.score);

        let bestChoice = [];
        let highestScore = 0;

        // Find contiguous seats if multiple seats are needed
            for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
                for (let seatIndex = 0; seatIndex < seats[rowIndex].length; seatIndex++) {
                    let contiguousSeats = [];
                    let totalScore = 0;

                    for (let j = 0; j < numSeats; j++) {
                        const seat = seatScores.find(s => s.rowIndex === rowIndex && s.seatIndex === seatIndex + j);
                        if (seat) {
                            contiguousSeats.push(seat);
                            totalScore += seat.score;
                        } else {

                            break;
                        }
                    }

                    if (totalScore > highestScore) {
                        bestChoice = contiguousSeats
                        highestScore = totalScore;
                    }
                }
            }
            // Logging
            console.log(bestChoice.length);
            console.log(bestChoice)

            // Finds the closest seat to the group of preferred/best seats
            if (bestChoice.length < numSeats) {
                let remainingSeats = numSeats - bestChoice.length;
                while (remainingSeats > 0) {
                    let nearestSeat = null;
                    let minDistance = Infinity;

                    for (let i = 0; i < seatScores.length; i++) {
                        const seat = seatScores[i];
                        if (!bestChoice.some(s => s.rowIndex === seat.rowIndex && s.seatIndex === seat.seatIndex)) {
                            const distance = bestChoice.reduce((acc, s) => acc + Math.abs(s.rowIndex - seat.rowIndex) + Math.abs(s.seatIndex - seat.seatIndex), 0);
                            if (distance < minDistance) {
                                minDistance = distance;
                                nearestSeat = seat;
                            }
                        }
                    }

                    if (nearestSeat) {
                        bestChoice.push(nearestSeat);
                        remainingSeats--;
                    } else {
                        break;
                    }
                }
            }

        return bestChoice;
    };

    const handleRecommendSeats = () => {
        const recommended = recommendSeats(seats, numSeats);// Example: recommend 2 seats
        setRecommendedSeats(recommended);
    };

    return (
        <div className="container" style={{paddingTop: '10px', color:"black"}}>
            <h2>Flight Details</h2>
            <p>Origin: {flight.origin}</p>
            <p>Destination: {flight.destination}</p>
            <p>Price: {flight.price}</p>
            <p>Free seats: {flight.freeSeats}</p>
            <p>Duration: {flight.durationMinutes} minutes</p>
            <p>Departure: {new Date(flight.departureTime).toDateString()}</p>
            <p>Arrival: {new Date(flight.arrivalTime).toDateString()}</p>
            <div className="seats-guide">
                <div className="guide-item">
                    <div className="seat free"></div>
                    <p> - Standard</p>
                </div>
                <div className="guide-item">
                    <div className="seat taken"> X </div>
                    <p> - Taken</p>
                </div>
                <div className="guide-item">
                    <div className="seat legroom"></div>
                    <p> - Extra legroom</p>
                </div>
            </div>

            <div>
                <label htmlFor="numSeats">Number of seats to recommend: </label>
                <input
                    type="number"
                    id="numSeats"
                    value={numSeats}
                    onChange={(e) => setNumSeats(parseInt(e.target.value))}
                    min="1"
                    max={seats.flat().filter(seat => seat === 0).length}
                />
            </div>

            <button className="button" onClick={handleRecommendSeats}>Recommend Seats</button>

            <div className="seats-grid">
                {seats.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                    {rowIndex === rowGapLocation && <div className={"row-gap"}> <p className={"exit1"}>EXIT |</p> <p className={"exit2"}>| EXIT</p></div>}
                    <div className="seats-row">
                        {row.map((seat, seatIndex) => (
                            <React.Fragment key={seatIndex}>
                            {seatIndex === columnGapLocation && <div className={"seat-gap"}> {rowIndex + 1} </div>}
                            <div key={seatIndex} className={`seat ${seat === 1 ? 'taken' : rowIndex === 0 ? 'legroom' : rowIndex === rowGapLocation ? 'legroom' : 'free'} 
                            ${recommendedSeats.some(s => s.rowIndex === rowIndex && s.seatIndex === seatIndex) ? 'recommended' : ''}`}>
                                {seat === 1 ? 'X' : ''}
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