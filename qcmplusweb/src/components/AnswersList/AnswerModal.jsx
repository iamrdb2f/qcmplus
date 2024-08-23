import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Modal, Spinner} from "react-bootstrap";
import {createAnswer, updateAnswer} from "../../services/AnswerService";

const AnswerModal = ({showModal, setShowModal, fetchAnswers, currentAnswer, modalType}) => {
    const [answerText, setAnswerText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (modalType === "edit" && currentAnswer) {
            setAnswerText(currentAnswer.answerText);
        } else {
            setAnswerText('');
        }
    }, [modalType, currentAnswer]);

    const handleSave = async () => {
        if (answerText.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            if (modalType === "create") {
                const dataAnswer = {answerText, questionId: 1, isCorrect: false};
                await createAnswer(dataAnswer);
            } else if (modalType === "edit" && currentAnswer) {
                await updateAnswer(currentAnswer.answerId, {...currentAnswer, answerText});
            }
            fetchAnswers();
            setShowModal(false);
        } catch (error) {
            setError(`Error ${modalType === "create" ? "creating" : "updating"} answer.`);
            console.error(`Error ${modalType === "create" ? "creating" : "updating"} answer:`, error);
            setLoading(false);
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{modalType === "create" ? "Add Answer" : "Update Answer"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="answerText">
                        <Form.Label>Answer Text</Form.Label>
                        <Form.Control
                            type="text"
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm"/> : "Save"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AnswerModal;