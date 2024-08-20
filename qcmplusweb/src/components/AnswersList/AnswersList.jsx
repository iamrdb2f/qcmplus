import React, {useCallback, useEffect, useState} from "react";
import {Alert, Button, Col, Form, Row, Spinner, Table} from "react-bootstrap";
import {createAnswer, deleteAnswer, getAllAnswers, updateAnswer} from '../../services/AnswerService';

const AnswersList = ({title}) => {
    const [answers, setAnswers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newAnswerText, setNewAnswerText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAnswers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllAnswers();
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
            //TODO HANDLE FROM THE FORM
            const dataAnswer = {answer_text: newAnswerText, questionId: 1, isCorrect: false}

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
            const answerToUpdate = answers.find(answer => answer.id === id);
            if (answerToUpdate) {
                await updateAnswer(id, {...answerToUpdate, answer_text: updatedText});
                fetchAnswers();
            }
        } catch (error) {
            setError("Error updating answer.");
            console.error("Error updating answer:", error);
            setLoading(false);
        }
    };

    const handleView = (answer) => {
        alert("show Answer : Travail en cours");
    };

    const filteredAnswers = searchTerm
        ? answers.filter((answer) =>
            answer.answer_text && answer.answer_text.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <th className="text-dark">Question ID</th>
                        <th className="text-dark">Answer ID</th>
                        <th className="text-dark">Answer Text</th>
                        <th className="text-dark">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4" className="text-center text-dark">
                                <Spinner animation="border"/>
                            </td>
                        </tr>
                    ) : filteredAnswers.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center text-dark">
                                No answers available
                            </td>
                        </tr>
                    ) : (
                        filteredAnswers.map((answer, index) => (
                            <tr key={answer.answerId} className="text-dark">
                                <td className="text-dark">{index + 1}</td>
                                <td className="text-dark">{answer.question.questionId}</td>
                                <td className="text-dark">{answer.answerId}</td>
                                <td className="text-dark">{answer.answerText}</td>
                                <td className="text-dark">
                                    <Button variant="success" size="sm" onClick={() => handleView(answer)}>View</Button>
                                    <Button variant="warning" size="sm"
                                            onClick={() => handleUpdate(answer.id, answer.answer_text)}
                                            className="ms-2">Update</Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(answer.id)}
                                        disabled={loading}
                                        className="ms-2"
                                    >
                                        {loading ? <Spinner animation="border" size="sm"/> : "Delete"}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default AnswersList;