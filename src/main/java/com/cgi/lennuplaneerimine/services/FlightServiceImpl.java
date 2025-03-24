package com.cgi.lennuplaneerimine.services;

import com.cgi.lennuplaneerimine.models.Flight;
import com.cgi.lennuplaneerimine.repositories.FlightRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class FlightServiceImpl implements FlightService {
    private final FlightRepository flightRepository;

    public FlightServiceImpl(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;

    }

    @Override
    public List<Flight> getAllFlights() {
        return (List<Flight>) flightRepository.findAll();
    }

    @Override
    public Optional<Flight> getFlightsById(Long id) {
        return flightRepository.findById(id);
    }

}
