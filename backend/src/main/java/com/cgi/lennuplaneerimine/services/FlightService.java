package com.cgi.lennuplaneerimine.services;

import com.cgi.lennuplaneerimine.models.BoughtFlight;
import com.cgi.lennuplaneerimine.models.Flight;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface FlightService {
    Flight getFlightsById(Long id);
    void updateFlight(Flight flight);
    void saveBoughtFlight(BoughtFlight boughtFlight);
    List<Flight> getAllFlights();
    List<BoughtFlight> getAllBoughtFlights();
}
