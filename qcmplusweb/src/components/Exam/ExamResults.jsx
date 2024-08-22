import React from 'react';
import {Alert, Container, ListGroup} from 'react-bootstrap';

const ExamResults = ({questions, answers, userAnswers, score}) => (
    <Container className="exam-results-container m-0 p-0">
        <h3 className="text-center p-2">Exam Results: {score} / {questions.length}</h3>
        <div className="exam-results-list mb-3 p-3">
            {questions.map((question, index) => (
                <div key={question.questionId} className="mb-4">
                    <h5>{index + 1}. {question.questionText}</h5>
                    <ListGroup>
                        {answers[question.questionId]?.map((answer) => (
                            <ListGroup.Item
                                key={answer.answerId}
                                className={`mb-2 p-2 ${
                                    answer.correct ? 'bg-success-color text-white' :
                                        (userAnswers[question.questionId] === answer.answerId && !answer.correct) ? 'bg-danger-color text-white' : ''
                                }`}
                            >
                                {answer.answerText}
                                {userAnswers[question.questionId] === answer.answerId && !answer.correct && (
                                    <strong> (Incorrect)</strong>
                                )}
                                {userAnswers[question.questionId] === answer.answerId && answer.correct && (
                                    <strong> (Correct)</strong>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            ))}
        </div>
        <Alert variant="success" className="text-center">Exam completed successfully. Thank you!</Alert>
    </Container>
);

export default ExamResults;