import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {deleteQuestion, getAllQuestions, getQuestionById} from "../../services/QuestionService";
import CreateQuestionForm from "./CreateQuestionForm";
import UpdateQuestionForm from "./UpdateQuestionForm";
import ViewQuestionModal from "./ViewQuestionModal";

const QuestionRow = ({question, handleEdit, handleDeleteClick, handleView}) => (
    <tr>
        <td>{question.questionId}</td>
        <td>{question.quiz.title}</td>
        <td>{question.questionText}</td>
        <td>
            <Button variant="success" className="me-3"
                    onClick={() => handleView(question.questionId, question.quiz.quizId)}>View</Button>
            <Button variant="warning" className="me-3"
                    onClick={() => handleEdit(question.questionId, question.quiz.quizId)}>Update</Button>
            <Button variant="danger" className="ms-3"
                    onClick={() => handleDeleteClick(question.questionId)}>Delete</Button>
        </td>
    </tr>
);

const QuestionsList = ({title}) => {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("create");
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [currentViewQuestion, setCurrentViewQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getAllQuestions();
                setQuestions(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch questions.");
            }
        };
        fetchQuestions();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreate = () => {
        setModalType("create");
        setCurrentQuestion(null);
        setShowModal(true);
    };

    const handleEdit = async (questionId, quizId) => {
        try {
            const response = await getQuestionById(questionId, quizId);
            setCurrentQuestion(response.data);
            setModalType("edit");
            setShowModal(true);
        } catch (error) {
            setErrorMessage("Failed to fetch question.");
        }
    };

    const handleDelete = async () => {
        try {
            const question = questions.find(q => q.questionId === questionToDelete);
            await deleteQuestion(questionToDelete, question.quiz.quizId);
            setQuestions(questions.filter((question) => question.questionId !== questionToDelete));
            setSuccessMessage("Question deleted successfully.");
            setShowDeleteConfirm(false);
        } catch (error) {
            setErrorMessage("Failed to delete question.");
        }
    };

    const handleDeleteClick = (questionId) => {
        setQuestionToDelete(questionId);
        setShowDeleteConfirm(true);
    };

    const handleView = async (questionId, quizId) => {
        try {
            const response = await getQuestionById(questionId, quizId);
            setCurrentViewQuestion(response.data);
            setShowViewModal(true);
        } catch (error) {
            setErrorMessage("Failed to fetch question.");
        }
    };

    const filteredQuestions = questions.filter((question) =>
        question.questionText.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Row className="mb-3">
                <Col>
                    <h4 className="text-start mb-3">{title}</h4>
                </Col>
                <Col>
                    <div className="search-bar">
                        <Form.Control
                            type="text"
                            placeholder="Search for question by text"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </Col>
                <Col className="text-end">
                    <Button className="defaultBtn me-5" onClick={handleCreate}>Create Question</Button>
                </Col>
            </Row>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <div style={{maxHeight: "500px", overflowY: "auto"}}>
                <Table striped bordered hover className="small-font">
                    <thead>
                    <tr>
                        <th>N°</th>
                        <th>Quiz</th>
                        <th>Question</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((question, index) => (
                            <QuestionRow key={question.questionId} question={question} handleEdit={handleEdit}
                                         handleDeleteClick={handleDeleteClick} handleView={handleView}/>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No questions to display</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this question?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
            {modalType === "create" ? (
                <CreateQuestionForm showModal={showModal} setShowModal={setShowModal}
                                    setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}
                                    setQuestions={setQuestions}/>
            ) : (
                <UpdateQuestionForm showModal={showModal} setShowModal={setShowModal} currentQuestion={currentQuestion}
                                    setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}
                                    setQuestions={setQuestions}/>
            )}
            <ViewQuestionModal showModal={showViewModal} setShowModal={setShowViewModal}
                               question={currentViewQuestion}/>
        </>
    );
};

export default QuestionsList;