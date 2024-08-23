import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {retrieveUsers} from "../../services/UserService";
import {retrieveQuizzes} from "../../services/QuizService";
import {getAllExamSession, submitExamSession} from "../../services/ExamService";

const CreateExamForm = ({showModal, setShowModal, setSuccessMessage, setErrorMessage, setExams}) => {
    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await retrieveUsers();
                setUsers(usersResponse.data);
                const quizzesResponse = await retrieveQuizzes();
                setQuizzes(quizzesResponse.data);
            } catch (error) {
                console.error("Failed to fetch users or quizzes.");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const minutes = parseInt(formData.get("timeSpent"), 10);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const timeSpent = `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:00`;

        const sessionData = {
            user: {id: formData.get("userId")},
            quiz: {quizId: formData.get("quizId")},
            score: formData.get("score"),
            timeSpent: timeSpent,
            dateExam: new Date(formData.get("dateExam")).toISOString(),
        };

        try {
            await submitExamSession(sessionData);
            setSuccessMessage("Exam session created successfully.");
            setShowModal(false);
            const response = await getAllExamSession();
            setExams(response.data);
        } catch (error) {
            setErrorMessage("Failed to submit exam session.");
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Exam Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="userId">
                        <Form.Label>User</Form.Label>
                        <Form.Control as="select" name="userId" required>
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="quizId">
                        <Form.Label>Quiz</Form.Label>
                        <Form.Control as="select" name="quizId" required>
                            <option value="">Select Quiz</option>
                            {quizzes.map(quiz => (
                                <option key={quiz.quizId} value={quiz.quizId}>{quiz.title}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="score">
                        <Form.Label>Score</Form.Label>
                        <Form.Control type="number" name="score" required/>
                    </Form.Group>
                    <Form.Group controlId="timeSpent">
                        <Form.Label>Time Spent in minutes</Form.Label>
                        <Form.Control type="number" name="timeSpent" required/>
                    </Form.Group>
                    <Form.Group controlId="dateExam">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="datetime-local" name="dateExam"
                                      defaultValue={new Date().toISOString().slice(0, 16)} required/>
                    </Form.Group>
                    <Button type="submit" className="defaultBtn mt-3">Create</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateExamForm;