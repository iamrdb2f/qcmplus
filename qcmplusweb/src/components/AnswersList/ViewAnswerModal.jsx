import React from "react";
import {Button, Modal} from "react-bootstrap";

const ViewAnswerModal = ({showModal, setShowModal, currentAnswer}) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>View Answer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Question : </strong> {currentAnswer?.question.questionText}</p>
                <p><strong>Answer :</strong> {currentAnswer?.answerText}</p>
                <p><strong>Is Correct: </strong>
                    <strong className={currentAnswer?.correct ? 'text-success' : 'text-danger'}>
                        {currentAnswer?.correct ? "True" : "False"}
                    </strong>
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewAnswerModal;