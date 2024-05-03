package com.qcmplus.qcmplus.model;

import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

@Getter
@Setter
public class TraineeResponseId implements Serializable {
    private Integer sessionId;
    private Integer responseId;
}