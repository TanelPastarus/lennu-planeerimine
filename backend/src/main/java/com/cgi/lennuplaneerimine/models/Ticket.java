package com.cgi.lennuplaneerimine.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Ticket {


    @Column(name = "seat_row")
    private Integer row;
    private Integer seat;

}
