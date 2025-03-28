package com.cgi.lennuplaneerimine.controller;

import com.cgi.lennuplaneerimine.models.BoughtFlight;
import com.cgi.lennuplaneerimine.models.Flight;
import com.cgi.lennuplaneerimine.services.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class FlightController {
    private final FlightService flightService;

    @GetMapping("/flights")
    public ResponseEntity<List<Flight>> getFlights() {
        return new ResponseEntity<>(flightService.getAllFlights(), HttpStatus.OK);
    }

    @GetMapping("/flights/boughtflights")
    public ResponseEntity<List<BoughtFlight>> getBoughtFlights() {
        return new ResponseEntity<>(flightService.getAllBoughtFlights(), HttpStatus.OK);
    }

    @GetMapping("/flights/{id}")
    public ResponseEntity<Flight> getFlights(@PathVariable Long id) {
        return new ResponseEntity<>(flightService.getFlightsById(id), HttpStatus.OK);
    }

    @PutMapping("/flights/update")
    public ResponseEntity<String> updateFlight(@RequestBody Flight flight) {
        flightService.updateFlight(flight);
        return new ResponseEntity<>("Flight " + flight.getOrigin() + " to " + flight.getDestination() + " updated succesfully", HttpStatus.OK);
    }

    @PutMapping("/flights/boughtflight/save")
    public ResponseEntity<String> saveBoughtFlight(@RequestBody BoughtFlight boughtFlight) {
        flightService.saveBoughtFlight(boughtFlight);
        return new ResponseEntity<>("Flight " + boughtFlight.getFlight().getOrigin() + " to " + boughtFlight.getFlight().getDestination() + " purchased succesfully", HttpStatus.OK);
    }
}
