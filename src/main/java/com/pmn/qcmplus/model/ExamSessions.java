package com.pmn.qcmplus.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "exam_sessions")
public class ExamSessions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Long sessionId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quizzes quiz;

    @Column(name = "score")
    private Long score;

    @Column(name = "time_spent")
    private Time timeSpent;

    @OneToMany(mappedBy="examSession")
    private List<TraineeAnswers> traineeAnswers;
}
