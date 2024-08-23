import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {deleteQuiz, retrieveQuizzes} from "../../services/QuizService";
import QuizForm from "./QuizForm";
import './QuizList.css';
import {getLoggedInUser} from "../../services/AuthService";

const QuizList = ({title}) => {
    const getUser = getLoggedInUser();
    const [quizzes, setQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("create");
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await retrieveQuizzes();
            setQuizzes(response.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            setErrorMessage("Error fetching quizzes. Please try again later.");
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreate = () => {
        setModalType("create");
        setCurrentQuiz(null);
        setShowModal(true);
    };

    const handleEdit = (quiz) => {
        setModalType("edit");
        setCurrentQuiz(quiz);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (!getUser || !getUser.userId) {
            throw new Error('User is not authenticated');
        }
        try {
            await deleteQuiz(quizToDelete);
            setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizToDelete));
            setSuccessMessage("Quiz deleted successfully.");
            setErrorMessage("");
            setShowConfirmModal(false);
            fetchQuizzes();
        } catch (error) {
            console.error("Error deleting quiz:", error);
            setErrorMessage("Error deleting quiz. Please try again later.");
            setSuccessMessage("");
        }
    };

    const confirmDelete = (quizId) => {
        setQuizToDelete(quizId);
        setShowConfirmModal(true);
    };

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                            placeholder="Search for quiz by title"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </Col>
                <Col className="text-end">
                    <Button className={"defaultBtn ms-3"} onClick={handleCreate}>Create Quiz</Button>
                </Col>
            </Row>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <div className="scrollable-table">
                <Table striped bordered hover className="small-font">
                    <thead>
                    <tr>
                        <th>N°</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredQuizzes.length > 0 ? (
                        filteredQuizzes.map((quiz, index) => (
                            <tr key={quiz.id}>
                                <td>{index + 1}</td>
                                <td>{quiz.title}</td>
                                <td>{quiz.description}</td>
                                <td>
                                    <Button variant="warning" className={"me-3"}
                                            onClick={() => handleEdit(quiz)}>Edit</Button>
                                    <Button variant="danger" className={"ms-3"}
                                            onClick={() => confirmDelete(quiz.quizId)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No quizzes found</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>

            <QuizForm
                showModal={showModal}
                setShowModal={setShowModal}
                modalType={modalType}
                currentQuiz={currentQuiz}
                setQuizzes={setQuizzes}
                quizzes={quizzes}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
                fetchQuizzes={fetchQuizzes}
            />

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default QuizList;