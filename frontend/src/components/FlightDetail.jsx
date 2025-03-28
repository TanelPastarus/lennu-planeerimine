import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getFlightById, saveBoughtFlight, updateFlight} from '../services/FlightService.js';

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

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const hoursAndMinutes = (date) => {
        const convertedDate = new Date(date);
        let hours = convertedDate.getHours();
        let minutes = convertedDate.getMinutes();

        if (hours === 0) hours += "0";
        if (minutes === 0) minutes += "0";

        return hours + ":" + minutes;
    }

    const convertHours = (minutes) => {
        const hours = Math.floor(minutes / 60);

        if (hours > 1) return hours + " hours";
        if (hours > 0) return 1 + " hour";
        return "";
    }


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
                if (rowIndex === rowGapLocation - 1 || rowIndex === rowGapLocation) score += 1;

                return { rowIndex, seatIndex, score }
            })
        ).flat().filter(seat => seat !== null);

        // Sort seats by score in ascending order
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
                            // console.log(JSON.parse(JSON.stringify(contiguousSeats)), totalScore)
                        } else {
                            break;
                        }
                    }

                    if (totalScore > highestScore && contiguousSeats.length >= numSeats) {
                        bestChoice = contiguousSeats
                        highestScore = totalScore;
                    }
                }
            }
            // Logging
            //console.log(bestChoice.length);
          //  console.log(bestChoice)

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
            if (numSeats > flight.freeSeats) {
                alert('Requested number of seats exceeds available seats.');
                return;
            }

            if (numSeats < 0) {
                alert('Please specify a seat');
                return;
            }

            const recommended = recommendSeats(seats, numSeats);// Example: recommend 2 seats
            setRecommendedSeats(recommended);

    };

    const handleSeatClick = (rowIndex, seatIndex) => {
        if (seats[rowIndex][seatIndex] === 1) {
            alert('This seat is already taken.');
            return;
        }

        const seat = { rowIndex, seatIndex };
        const isSelected = recommendedSeats.some(s => s.rowIndex === rowIndex && s.seatIndex === seatIndex);

        if (isSelected) {
            setRecommendedSeats(recommendedSeats.filter(s => !(s.rowIndex === rowIndex && s.seatIndex === seatIndex)));
        } else {
            if (recommendedSeats.length < numSeats) {
                setRecommendedSeats([...recommendedSeats, seat]);
            } else {
                alert(`You can only select up to ${numSeats} seats.`);
            }
        }
    };

    const handleConfirmSeats = () => {
        if (recommendedSeats.length === numSeats) {
            const updatedSeats = seats.map((row, rowIndex) =>
                row.map((seat, seatIndex) => {
                    if (recommendedSeats.some(s => s.rowIndex === rowIndex && s.seatIndex === seatIndex)) {
                        return 1; // Mark the seat as taken
                    }
                    return seat;
                })
            );

            const updatedFlight = {
                ...flight,
                jsonSeats: JSON.stringify(updatedSeats)
            };

            const boughtFlight = {
                flight: updatedFlight,
                ticketList: recommendedSeats
            }

            console.log(boughtFlight);
            updateFlight(updatedFlight)
            saveBoughtFlight(boughtFlight)

        } else {
            alert(`Please select exactly ${numSeats} seats.`);
        }


    };

    return (
        <div className="container">
            <h2>Flight Details</h2>
            <div className="flight-info">
                <p><strong>Origin:</strong> {flight.origin}</p>
                <p><strong>Destination:</strong> {flight.destination}</p>
                <p><strong>Price:</strong> {flight.price}</p>
                <p><strong>Date: </strong>{new Date(flight.departureTime).toLocaleDateString("en-US", options)} </p>
                <p><strong>Free seats:</strong> {flight.freeSeats}</p>
                <p><strong>Duration:</strong> {convertHours(flight.durationMinutes)} {flight.durationMinutes % 60 > 0 ? flight.durationMinutes % 60 + " minutes" : ""}</p>
                <p><strong>Departure:</strong> {hoursAndMinutes(flight.departureTime)}</p>
                <p><strong>Arrival:</strong> {hoursAndMinutes(flight.arrivalTime)}</p>
            </div>


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

            <div className="seat-selection">
                <label htmlFor="numSeats">Number of seats: </label>
                <input
                    type="number"
                    id="numSeats"
                    value={numSeats}
                    onChange={(e) => setNumSeats(parseInt(e.target.value))}
                    min="1"
                    max={flight.freeSeats}
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

                            <div  key={seatIndex} className={`seat ${seat === 1 ? 'taken' : rowIndex === 0 ? 'legroom' : rowIndex === rowGapLocation ? 'legroom' : 'free'} 
                            ${recommendedSeats.some(s => s.rowIndex === rowIndex && s.seatIndex === seatIndex) ? 'recommended' : ''}`}
                                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                            >
                                {seat === 1 ? 'X' : ''}
                            </div>
                            </React.Fragment>
                        ))}
                    </div>
                    </React.Fragment>
                ))}
            </div>
            <button className="button" onClick={handleConfirmSeats}>Confirm</button>

        </div>
    );
};

export default FlightDetail;