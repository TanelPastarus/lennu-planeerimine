package com.cgi.lennuplaneerimine.services;

import com.cgi.lennuplaneerimine.models.Flight;
import com.cgi.lennuplaneerimine.repositories.FlightRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class FlightServiceImpl implements FlightService {
    private final FlightRepository flightRepository;

    public FlightServiceImpl(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;

        int[][] seats1 = generateRandomSeats();
        int[][] seats2 = generateRandomSeats();
        int[][] seats3 = generateRandomSeats();
        int[][] seats4 = generateRandomSeats();
        int[][] seats5 = generateRandomSeats();
        int[][] seats6 = generateRandomSeats();

        new Flight(1L, "New York", "Los Angeles",howManyFreeSeats(seats1), 300, 500, LocalDateTime.of(2025, 3, 31, 10, 0), LocalDateTime.of(2025, 3, 31, 15, 0), seatsToJson(seats1));
        new Flight(2L, "Chicago", "Miami", howManyFreeSeats(seats2), 180, 300,LocalDateTime.of(2025, 5, 3, 12, 0), LocalDateTime.of(2025, 5, 3, 15, 0), seatsToJson(seats2));
        new Flight(3L, "San Francisco", "Seattle",howManyFreeSeats(seats3), 120, 200, LocalDateTime.of(2025, 3, 28, 14, 0), LocalDateTime.of(2025, 3, 28, 16, 0), seatsToJson(seats3));
        new Flight(4L, "Dallas", "Houston", 60, 100, howManyFreeSeats(seats4), LocalDateTime.of(2025, 4, 4, 16, 0), LocalDateTime.of(2025, 4, 4, 17, 40), seatsToJson(seats4));
        new Flight(5L, "Boston", "Washington D.C.", howManyFreeSeats(seats5), 90, 150, LocalDateTime.of(2025, 4, 5, 18, 0), LocalDateTime.of(2025, 4, 5, 19, 30), seatsToJson(seats5));
        new Flight(6L, "Atlanta", "Orlando", 120, 250, howManyFreeSeats(seats6), LocalDateTime.of(2025, 3, 30, 17, 0), LocalDateTime.of(2025, 3, 30, 21, 10), seatsToJson(seats6));
    }

    @Override
    public List<Flight> getAllFlights() {
        return (List<Flight>) flightRepository.findAll();
    }

    @Override
    public Optional<Flight> getFlightsById(Long id) {
        return flightRepository.findById(id);
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
        int[][] array = new int[4][10];
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
