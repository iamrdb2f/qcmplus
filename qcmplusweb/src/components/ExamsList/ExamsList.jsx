import React, {useEffect, useState} from "react";
import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import {deleteExamSession, getAllExamSession, getExamSession} from "../../services/ExamService";
import CreateExamForm from "./CreateExamForm";
import UpdateExamForm from "./UpdateExamForm";
import ExamTable from "./ExamTable";

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
                setErrorMessage("Failed to fetch exams.");
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
            setErrorMessage("Failed to fetch exam session.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteExamSession(examToDelete);
            setExams(exams.filter((exam) => exam.sessionId !== examToDelete));
            setSuccessMessage("Exam session deleted successfully.");
            setShowDeleteConfirm(false);
        } catch (error) {
            setErrorMessage("Failed to delete exam session.");
        }
    };

    const handleDeleteClick = (sessionId) => {
        setExamToDelete(sessionId);
        setShowDeleteConfirm(true);
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
            <ExamTable exams={filteredExams} handleEdit={handleEdit} handleDeleteClick={handleDeleteClick}/>
            {modalType === "create" ? (
                <CreateExamForm showModal={showModal} setShowModal={setShowModal} setSuccessMessage={setSuccessMessage}
                                setErrorMessage={setErrorMessage} setExams={setExams}/>
            ) : (
                <UpdateExamForm showModal={showModal} setShowModal={setShowModal} currentExam={currentExam}
                                setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}
                                setExams={setExams}/>
            )}
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