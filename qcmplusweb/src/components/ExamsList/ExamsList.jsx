import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {deleteExamSession, getAllExamSession, getExamSession, submitExamSession} from "../../services/ExamService";

const ExamsList = ({title}) => {
    const [exams, setExams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("create");
    const [currentExam, setCurrentExam] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [examToDelete, setExamToDelete] = useState(null);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await getAllExamSession();
                setExams(response.data);
            } catch (error) {
                console.error("Failed to fetch exams:", error);
            }
        };
        fetchExams();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreate = () => {
        setModalType("create");
        setCurrentExam(null);
        setShowModal(true);
    };

    const handleEdit = async (sessionId) => {
        try {
            const response = await getExamSession(sessionId);
            setCurrentExam(response.data);
            setModalType("edit");
            setShowModal(true);
        } catch (error) {
            console.error("Failed to fetch exam session:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteExamSession(examToDelete);
            setExams(exams.filter((exam) => exam.sessionId !== examToDelete));
            setSuccessMessage("Exam session deleted successfully.");
            setShowDeleteConfirm(false);
            setExamToDelete(null);
        } catch (error) {
            setErrorMessage("Failed to delete exam session.");
            console.error("Failed to delete exam session:", error);
        }
    };

    const handleDeleteClick = (sessionId) => {
        setExamToDelete(sessionId);
        setShowDeleteConfirm(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const sessionData = {
            userId: formData.get("userId"),
            quizId: formData.get("quizId"),
            score: formData.get("score"),
            timeSpent: formData.get("timeSpent"),
            dateExam: formData.get("dateExam"),
        };

        try {
            if (modalType === "create") {
                await submitExamSession(sessionData);
                setSuccessMessage("Exam session created successfully.");
            } else {
                await submitExamSession({...sessionData, sessionId: currentExam.sessionId});
                setSuccessMessage("Exam session updated successfully.");
            }
            setShowModal(false);
            setCurrentExam(null);
            const response = await getAllExamSession();
            setExams(response.data);
        } catch (error) {
            setErrorMessage("Failed to submit exam session.");
        }
    };

    const filteredExams = exams.filter((exam) =>
        (exam.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.quiz?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
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
                            placeholder="Search for exam by user email or quiz title"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </Col>
                <Col className="text-end">
                    <Button className={"defaultBtn me-5"} onClick={handleCreate}>Create Exam</Button>
                </Col>
            </Row>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
                <Table striped bordered hover className="small-font">
                    <thead>
                    <tr>
                        <th>N°</th>
                        <th>User Name</th>
                        <th>Quiz Title</th>
                        <th>Score</th>
                        <th>Time Spent</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredExams.length > 0 ? (
                        filteredExams.map((exam, index) => (
                            <tr key={exam.sessionId}>
                                <td>{index + 1}</td>
                                <td>{exam.user?.firstName + '  ' + exam.user?.lastName.toUpperCase() || "No Name"}</td>
                                <td>{exam.quiz.title}</td>
                                <td>{exam.score}</td>
                                <td>{exam.timeSpent}</td>
                                <td>{new Date(exam.dateExam).toLocaleString()}</td>
                                <td>
                                    <Button variant="warning" className={"me-3"}
                                            onClick={() => handleEdit(exam.sessionId)}>Update</Button>
                                    <Button variant="danger" className={"ms-3"}
                                            onClick={() => handleDeleteClick(exam.sessionId)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No exams to display</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === "create" ? "Create Exam Session" : "Edit Exam Session"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="userId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" name="userId" defaultValue={currentExam?.user.id || ""} required/>
                        </Form.Group>
                        <Form.Group controlId="quizId">
                            <Form.Label>Quiz ID</Form.Label>
                            <Form.Control type="text" name="quizId" defaultValue={currentExam?.quiz.quizId || ""}
                                          required/>
                        </Form.Group>
                        <Form.Group controlId="score">
                            <Form.Label>Score</Form.Label>
                            <Form.Control type="number" name="score" defaultValue={currentExam?.score || ""} required/>
                        </Form.Group>
                        <Form.Group controlId="timeSpent">
                            <Form.Label>Time Spent</Form.Label>
                            <Form.Control type="text" name="timeSpent" defaultValue={currentExam?.timeSpent || ""}
                                          required/>
                        </Form.Group>
                        <Form.Group controlId="dateExam">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="datetime-local" name="dateExam"
                                          defaultValue={currentExam ? new Date(currentExam.dateExam).toISOString().slice(0, 16) : ""}
                                          required/>
                        </Form.Group>
                        <Button type="submit" className=" defaultBtn mt-3">
                            {modalType === "create" ? "Create" : "Update"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this exam session?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExamsList;