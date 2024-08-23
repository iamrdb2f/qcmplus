import React, {useCallback, useEffect, useState} from "react";
import {Alert, Button, Col, Form, Modal, Row, Spinner, Table} from "react-bootstrap";
import {deleteAnswer, getAllAnswers} from '../../services/AnswerService';
import AnswerModal from "./AnswerModal";
import ViewAnswerModal from "./ViewAnswerModal";
import DeleteAnswerModal from "./DeleteAnswerModal";
import UpdateAnswerForm from "./UpdateAnswerForm";
import CreateAnswerForm from "./CreateAnswerForm";

const AnswersList = ({title}) => {
    const [answers, setAnswers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [modalType, setModalType] = useState("create");
    const [answerToDelete, setAnswerToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchAnswers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllAnswers();
            setAnswers(response.data);
        } catch (error) {
            setError("Error fetching answers.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAnswers();
    }, [fetchAnswers]);

    const handleCreate = () => {
        setShowCreateModal(true);
    };

    const handleEdit = (answer) => {
        setCurrentAnswer(answer);
        setShowUpdateModal(true);
    };

    const handleView = (answer) => {
        setCurrentAnswer(answer);
        setShowViewModal(true);
    };

    const handleDeleteClick = (answerId) => {
        setAnswerToDelete(answerId);
        setShowDeleteConfirm(true);
    };

    const handleDelete = async () => {
        try {
            await deleteAnswer(answerToDelete);
            fetchAnswers();
            setShowDeleteConfirm(false);
        } catch (error) {
            setError("Error deleting answer.");
        }
    };

    const filteredAnswers = searchTerm.trim()
        ? answers.filter((answer) =>
            (answer.answerText && answer.answerText.toLowerCase().includes(searchTerm.trim().toLowerCase())) ||
            (answer.question.questionText && answer.question.questionText.toLowerCase().includes(searchTerm.trim().toLowerCase()))
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
                        placeholder="Search for answer text or question text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-dark"
                    />
                </Col>
                <Col className="text-end">
                    <Button className="defaultBtn me-5" onClick={handleCreate}>Add Answer</Button>
                </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
                                    <Button variant="danger" size="sm"
                                            onClick={() => handleDeleteClick(answer.answerId)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>
            <AnswerModal showModal={showModal} setShowModal={setShowModal} fetchAnswers={fetchAnswers}
                         currentAnswer={currentAnswer} modalType={modalType}/>
            <ViewAnswerModal showModal={showViewModal} setShowModal={setShowViewModal} currentAnswer={currentAnswer}/>
            <DeleteAnswerModal showModal={showDeleteConfirm} setShowModal={setShowDeleteConfirm}
                               handleDelete={handleDelete}/>
            <UpdateAnswerForm showModal={showUpdateModal} setShowModal={setShowUpdateModal}
                              currentAnswer={currentAnswer}
                              fetchAnswers={fetchAnswers}/>
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Answer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateAnswerForm fetchAnswers={fetchAnswers} setShowModal={setShowCreateModal}
                                      setSuccessMessage={setSuccessMessage}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AnswersList;