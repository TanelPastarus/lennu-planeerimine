package com.cgi.lennuplaneerimine.services;

import com.cgi.lennuplaneerimine.models.BoughtFlight;
import com.cgi.lennuplaneerimine.models.Flight;
import com.cgi.lennuplaneerimine.models.Ticket;
import com.cgi.lennuplaneerimine.repositories.BoughtFlightRepository;
import com.cgi.lennuplaneerimine.repositories.FlightRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class FlightServiceImpl implements FlightService {
    private final FlightRepository flightRepository;
    private final BoughtFlightRepository boughtFlightRepository;

    public FlightServiceImpl(FlightRepository flightRepository, BoughtFlightRepository boughtFlightRepository) {
        this.flightRepository = flightRepository;
        this.boughtFlightRepository = boughtFlightRepository;

        int[][] seats1 = generateRandomSeats();
        int[][] seats2 = generateRandomSeats();
        int[][] seats3 = generateRandomSeats();
        int[][] seats4 = generateRandomSeats();
        int[][] seats5 = generateRandomSeats();
        int[][] seats6 = generateRandomSeats();

        flightRepository.save(new Flight(1L, "New York", "Los Angeles",howManyFreeSeats(seats1), 300, 500, LocalDateTime.of(2025, 3, 31, 10, 0), LocalDateTime.of(2025, 3, 31, 15, 0), seatsToJson(seats1)));
        flightRepository.save(new Flight(2L, "Chicago", "Miami", howManyFreeSeats(seats2), 180, 300,LocalDateTime.of(2025, 5, 3, 12, 0), LocalDateTime.of(2025, 5, 3, 15, 0), seatsToJson(seats2)));
        flightRepository.save(new Flight(3L, "San Francisco", "Seattle",howManyFreeSeats(seats3), 120, 200, LocalDateTime.of(2025, 3, 28, 14, 0), LocalDateTime.of(2025, 3, 28, 16, 0), seatsToJson(seats3)));
        flightRepository.save(new Flight(4L, "Dallas", "Houston", howManyFreeSeats(seats4), 60, 100,  LocalDateTime.of(2025, 4, 4, 16, 0), LocalDateTime.of(2025, 4, 4, 17, 40), seatsToJson(seats4)));
        flightRepository.save(new Flight(5L, "Boston", "Washington D.C.", howManyFreeSeats(seats5), 90, 150, LocalDateTime.of(2025, 4, 5, 18, 0), LocalDateTime.of(2025, 4, 5, 19, 30), seatsToJson(seats5)));
        flightRepository.save(new Flight(6L, "Atlanta", "Orlando", howManyFreeSeats(seats6), 120, 250,  LocalDateTime.of(2025, 3, 30, 17, 0), LocalDateTime.of(2025, 3, 30, 21, 10), seatsToJson(seats6)));
    }

    @Override
    public List<Flight> getAllFlights() {
        Iterable<Flight> flights = flightRepository.findAll();
        List<Flight> flightList = new ArrayList<>();
        flights.forEach(flightList::add);
        return flightList;
    }

    @Override
    public List<BoughtFlight> getAllBoughtFlights() {
        Iterable<BoughtFlight> flights = boughtFlightRepository.findAll();
        List<BoughtFlight> flightList = new ArrayList<>();
        flights.forEach(flightList::add);
        return flightList;
    }

    @Override
    public Flight getFlightsById(Long id) {
        Optional<Flight> flight = flightRepository.findById(id);

        return flight.orElse(null);
    }

    @Override
    public void updateFlight(Flight flight) {
        Flight oldFlight = flightRepository.findById(flight.getId()).get();

        oldFlight.setJsonSeats(flight.getJsonSeats());
        flightRepository.save(oldFlight);
    }

    @Override
    public void saveBoughtFlight(BoughtFlight boughtFlight) {
        BoughtFlight newBoughtFlight = new BoughtFlight();
        newBoughtFlight.setFlight(boughtFlight.getFlight());
        newBoughtFlight.setTicketList(boughtFlight.getTicketList());

        boughtFlightRepository.save(newBoughtFlight);
    }



    private String seatsToJson(int[][] seats) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(seats);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // Generate a random 4x10 array with 0s and 1s (0 = free seat, 1 = taken seat)
    private int[][] generateRandomSeats() {
        Random random = new Random();
        int[][] array = new int[14][6];
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                array[i][j] = random.nextInt(2);
            }
        }
        return array;
    }

    private int howManyFreeSeats(int[][] array) {
        int freeSeats = 0;
        for (int[] ints : array) {
            for (int anInt : ints) {
                if (anInt == 0) {
                    freeSeats += 1;
                }
            }
        }
        return freeSeats;
    }
}
