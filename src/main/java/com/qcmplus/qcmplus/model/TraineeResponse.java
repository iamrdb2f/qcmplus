package com.qcmplus.qcmplus.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "trainee_responses")
@IdClass(TraineeResponseId.class)
public class TraineeResponse {

    @Id
    @Column(name = "session_id")
    private Integer sessionId;

    @Id
    @Column(name = "response_id")
    private Integer responseId;

    @ManyToOne
    @JoinColumn(name = "session_id", insertable = false, updatable = false)
    private ExamSession session;

    @ManyToOne
    @JoinColumn(name = "response_id", insertable = false, updatable = false)
    private Response response;

    // getters and setters...
}