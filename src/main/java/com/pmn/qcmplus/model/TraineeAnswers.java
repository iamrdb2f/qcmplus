package com.pmn.qcmplus.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "trainee_answers")
public class TraineeAnswers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private ExamSessions examSession;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answers answer;
}
