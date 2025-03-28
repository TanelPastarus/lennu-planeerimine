package com.cgi.lennuplaneerimine.repositories;

import com.cgi.lennuplaneerimine.models.BoughtFlight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoughtFlightRepository extends CrudRepository<BoughtFlight, Long> {

}
