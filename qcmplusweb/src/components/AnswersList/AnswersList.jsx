import React, {useCallback, useEffect, useState} from "react";
import {Alert, Button, Col, Form, Modal, Row, Spinner, Table} from "react-bootstrap";
import {createAnswer, deleteAnswer, getAllAnswers, updateAnswer} from '../../services/AnswerService';

const AnswersList = ({title}) => {
    const [answers, setAnswers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newAnswerText, setNewAnswerText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [modalType, setModalType] = useState("create");

    const fetchAnswers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllAnswers();
            console.log(response.data);
            setAnswers(response.data);
        } catch (error) {
            setError("Error fetching answers.");
            console.error("Error fetching answers:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAnswers();
    }, [fetchAnswers]);

    const handleDelete = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteAnswer(id);
            fetchAnswers();
        } catch (error) {
            setError("Error deleting answer.");
            console.error("Error deleting answer:", error);
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (newAnswerText.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            const dataAnswer = {answerText: newAnswerText, questionId: 1, isCorrect: false};
            await createAnswer(dataAnswer);
            setNewAnswerText('');
            fetchAnswers();
        } catch (error) {
            setError("Error creating answer.");
            console.error("Error creating answer:", error);
            setLoading(false);
        }
    };

    const handleUpdate = async (id, updatedText) => {
        if (updatedText.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            const answerToUpdate = answers.find(answer => answer.answerId === id);
            if (answerToUpdate) {
                await updateAnswer(id, {...answerToUpdate, answerText: updatedText});
                fetchAnswers();
            }
        } catch (error) {
            setError("Error updating answer.");
            console.error("Error updating answer:", error);
            setLoading(false);
        }
    };

    const handleView = (answer) => {
        setCurrentAnswer(answer);
        setModalType("view");
        setShowModal(true);
    };

    const handleEdit = (answer) => {
        setCurrentAnswer(answer);
        setModalType("edit");
        setShowModal(true);
    };

    const filteredAnswers = searchTerm
        ? answers.filter((answer) =>
            answer.answerText && answer.answerText.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : answers;

    return (
        <>
            <Row className="mb-3">
                <Col>
                    <h4 className="text-start mb-3 text-dark">{title}</h4>
                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search for answer text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-dark"
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Enter new answer"
                        value={newAnswerText}
                        onChange={(e) => setNewAnswerText(e.target.value)}
                        className="text-dark"
                    />
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleCreate} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm"/> : "Add Answer"}
                    </Button>
                </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
                <Table striped bordered hover className="small-font text-dark">
                    <thead>
                    <tr>
                        <th className="text-dark">N°</th>
                        <th className="text-dark">Question</th>
                        <th className="text-dark">Answer</th>
                        <th className="text-dark">Correct A.</th>
                        <th className="text-dark">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center text-dark">
                                <Spinner animation="border"/>
                            </td>
                        </tr>
                    ) : filteredAnswers.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center text-dark">
                                No answers available
                            </td>
                        </tr>
                    ) : (
                        filteredAnswers.map((answer, index) => (
                            <tr key={answer.answerId} className="text-dark">
                                <td className="text-dark">{index + 1}</td>
                                <td className="text-dark">{answer.question.questionText}</td>
                                <td className="text-dark">{answer.answerText}</td>
                                <td className="text-dark">{answer.correct ? "True" : "False"}</td>
                                <td className="text-dark">
                                    <Button variant="success" size="sm" onClick={() => handleView(answer)}>View</Button>
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(answer)}
                                            className="ms-2">Update</Button>
                                    <Button variant="danger" onClick={() => handleDelete(answer.answerId)}
                                            disabled={loading} className="ms-2">
                                        {loading ? <Spinner animation="border" size="sm"/> : "Delete"}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === "view" ? "View Answer" : "Update Answer"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === "view" ? (
                        <>
                            <p><strong>Question ID:</strong> {currentAnswer?.question.questionId}</p>
                            <p><strong>Answer Text:</strong> {currentAnswer?.answerText}</p>
                            <p><strong>Is Correct:</strong> {currentAnswer?.isCorrect ? "Yes" : "No"}</p>
                        </>
                    ) : (
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(currentAnswer.answerId, currentAnswer.answerText);
                            setShowModal(false);
                        }}>
                            <Form.Group controlId="answerText">
                                <Form.Label>Answer Text</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentAnswer?.answerText || ""}
                                    onChange={(e) => setCurrentAnswer({...currentAnswer, answerText: e.target.value})}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" className="defaultBtn mt-3">Update</Button>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AnswersList;