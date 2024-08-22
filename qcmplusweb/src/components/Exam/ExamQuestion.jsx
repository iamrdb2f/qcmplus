import React from 'react';
import {Button, Form} from 'react-bootstrap';

const ExamQuestion = ({
                          question,
                          answers,
                          userAnswers,
                          handleAnswerChange,
                          handlePreviousQuestion,
                          handleNextQuestion,
                          handleSubmit,
                          currentQuestionIndex,
                          questionsLength
                      }) => (
    <div className="exam-card p-4">
        <h4 className="question-header text-center">Question {currentQuestionIndex + 1} of {questionsLength}</h4>
        <p className="question-text">{question.questionText}</p>
        <Form>
            {answers.map((answer) => (
                <Form.Check
                    key={answer.answerId}
                    type="radio"
                    name={`question-${question.questionId}`}
                    label={answer.answerText}
                    checked={userAnswers[question.questionId] === answer.answerId}
                    onChange={() => handleAnswerChange(question.questionId, answer.answerId)}
                    className="form-check-lg p-1 ms-3"
                />
            ))}
        </Form>
        <div className="d-flex justify-content-between mt-3">
            <Button
                className="defaultBtn"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
            >
                Previous
            </Button>
            <Button
                className="defaultBtn"
                onClick={handleNextQuestion}
                disabled={
                    currentQuestionIndex >= questionsLength - 1 ||
                    !userAnswers[question.questionId]
                }
            >
                Next
            </Button>
            {currentQuestionIndex === questionsLength - 1 && (
                <Button
                    className="ms-2 defaultBtn"
                    onClick={handleSubmit}
                    disabled={!userAnswers[question.questionId]}
                >
                    Submit
                </Button>
            )}
        </div>
    </div>
);

export default ExamQuestion;