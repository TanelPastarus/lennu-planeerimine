package com.cgi.lennuplaneerimine.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Flight {
    @Id
    private Long id;
    private String destination;
    private String origin;
    private Integer freeSeats;
    private Integer durationMinutes;
    private Integer price;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String jsonSeats;
}
