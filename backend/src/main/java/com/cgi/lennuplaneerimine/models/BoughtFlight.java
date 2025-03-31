package com.cgi.lennuplaneerimine.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class BoughtFlight {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;

    @ElementCollection
    @CollectionTable(name = "bought_flight_ticket_list", joinColumns = @JoinColumn(name = "bought_flight_id"))
    @AttributeOverride(name = "row", column = @Column(name = "seat_row"))
    @OrderColumn(name = "ticket_list_id")
    private List<Ticket> ticketList;
}
