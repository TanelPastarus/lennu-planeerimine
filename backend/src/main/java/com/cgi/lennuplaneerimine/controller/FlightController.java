package com.cgi.lennuplaneerimine.controller;

import com.cgi.lennuplaneerimine.models.Flight;
import com.cgi.lennuplaneerimine.services.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/flight/{id}")
    public ResponseEntity<Flight> getFlights(@PathVariable Long id) {
        return new ResponseEntity<>(flightService.getFlightsById(id), HttpStatus.OK);
    }


}
