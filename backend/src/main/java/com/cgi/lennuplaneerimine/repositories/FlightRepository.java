package com.cgi.lennuplaneerimine.repositories;

import com.cgi.lennuplaneerimine.models.Flight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends CrudRepository<Flight, Long> {
}
