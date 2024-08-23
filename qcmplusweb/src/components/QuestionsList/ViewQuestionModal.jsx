import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {getAnswersByQuestionId} from "../../services/AnswerService";

const ViewQuestionModal = ({showModal, setShowModal, question}) => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            if (question) {
                try {
                    const response = await getAnswersByQuestionId(question.questionId);
                    console.log(response.data);
                    setAnswers(response.data);
                } catch (error) {
                    console.error("Failed to fetch answers", error);
                }
            }
        };
        fetchAnswers();
    }, [question]);

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>View Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {question ? (
                    <>
                        <p><strong>Quiz:</strong> {question.quiz.title}</p>
                        <p><strong>Question:</strong> {question.questionText}</p>
                        <p><strong>Answers:</strong></p>
                        <ul>
                            {answers.map((answer) => (
                                <li key={answer.id}>
                                    {answer.answerText} {answer.correct &&
                                    <strong className={'text-success'}> (Correct)</strong>}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewQuestionModal;