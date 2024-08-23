import React, {useCallback, useEffect, useState} from "react";
import {Alert, Button, Col, Form, Row, Spinner, Table} from "react-bootstrap";
import {getAllAnswers} from '../../services/AnswerService';
import CreateAnswerForm from "./CreateAnswerForm";
import UpdateAnswerForm from "./UpdateAnswerForm";
import DeleteAnswerButton from "./DeleteAnswerButton";

const AnswersList = ({title}) => {
    const [answers, setAnswers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
                    <CreateAnswerForm fetchAnswers={fetchAnswers}/>
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
                        <th className="text-dark">Correct Ans.</th>
                        <th className="text-dark text-center" colSpan="2">Actions</th>
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
                                <td className="text-dark"><strong>{answer.correct ? "True" : "False"}</strong></td>
                                <td className="text-dark" style={{whiteSpace: 'nowrap'}}>
                                    <Button variant="success" size="sm" onClick={() => handleView(answer)}>View</Button>
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(answer)}
                                            className="mx-2">Update</Button>
                                    <DeleteAnswerButton answerId={answer.answerId} fetchAnswers={fetchAnswers}/>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>
            <UpdateAnswerForm showModal={showModal} setShowModal={setShowModal} currentAnswer={currentAnswer}
                              fetchAnswers={fetchAnswers}/>
        </>
    );
};

export default AnswersList;