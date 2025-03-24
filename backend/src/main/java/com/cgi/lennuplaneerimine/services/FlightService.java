package com.cgi.lennuplaneerimine.services;

import com.cgi.lennuplaneerimine.models.Flight;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface FlightService {
    Flight getFlightsById(Long id);
    List<Flight> getAllFlights();
}
