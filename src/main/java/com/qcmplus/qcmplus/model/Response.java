package com.qcmplus.qcmplus.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "responses")
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer responseId;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    private String responseText;

    private Boolean isCorrect;

   
}