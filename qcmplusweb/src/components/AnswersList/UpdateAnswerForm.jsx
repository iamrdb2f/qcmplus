import React, {useState} from "react";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {updateAnswer} from "../../services/AnswerService";

const UpdateAnswerForm = ({showModal, setShowModal, currentAnswer, fetchAnswers}) => {
    const [updatedText, setUpdatedText] = useState(currentAnswer?.answerText || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdate = async (id) => {
        if (updatedText.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            await updateAnswer(id, {...currentAnswer, answerText: updatedText});
            fetchAnswers();
            setShowModal(false);
        } catch (error) {
            setError("Error updating answer.");
            console.error("Error updating answer:", error);
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
                    <Form.Group controlId="answerText">
                        <Form.Label>Answer Text</Form.Label>
                        <Form.Control
                            type="text"
                            value={updatedText}
                            onChange={(e) => setUpdatedText(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="defaultBtn mt-3">Update</Button>
                </Form>
                {error && <Alert variant="danger">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateAnswerForm;