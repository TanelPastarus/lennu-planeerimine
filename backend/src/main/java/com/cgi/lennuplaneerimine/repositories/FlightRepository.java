package com.cgi.lennuplaneerimine.repositories;

import com.cgi.lennuplaneerimine.models.Flight;
import org.springframework.data.repository.CrudRepository;

public interface FlightRepository extends CrudRepository<Flight, Long> {

}
