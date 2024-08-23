import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {updateAnswer} from "../../services/AnswerService";

const UpdateAnswerForm = ({showModal, setShowModal, currentAnswer, fetchAnswers}) => {
    const [updatedText, setUpdatedText] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentAnswer) {
            setUpdatedText(currentAnswer.answerText);
            setIsCorrect(currentAnswer.correct);
        }
    }, [currentAnswer]);

    const handleUpdate = async (id) => {
        if (updatedText.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            await updateAnswer(id, {...currentAnswer, answerText: updatedText, correct: isCorrect});
            fetchAnswers();
            setShowModal(false);
        } catch (error) {
            setError("Error updating answer.");
            setLoading(false);
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Answer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(currentAnswer.answerId);
                }}>
                    <Form.Group controlId="questionText">
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentAnswer?.question.questionText}
                            readOnly
                            disabled
                        />
                    </Form.Group>
                    <Form.Group controlId="answerText" className="mt-3">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={updatedText}
                            onChange={(e) => setUpdatedText(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="isCorrect" className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="Correct Answer"
                            checked={isCorrect}
                            onChange={(e) => setIsCorrect(e.target.checked)}
                        />
                    </Form.Group>
                    <Button type="submit" className="defaultBtn mt-3">Update</Button>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateAnswerForm;