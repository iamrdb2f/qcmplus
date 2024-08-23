// src/components/QuestionsList/CreateQuestionForm.jsx
import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {createQuestion, getAllQuestions} from "../../services/QuestionService";
import {retrieveQuizzes} from "../../services/QuizService";

const CreateQuestionForm = ({showModal, setShowModal, setSuccessMessage, setErrorMessage, setQuestions}) => {
    const [quizzes, setQuizzes] = useState([]);
    const [questionText, setQuestionText] = useState("");
    const [selectedQuiz, setSelectedQuiz] = useState("");

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await retrieveQuizzes();
                setQuizzes(response.data);
            } catch (error) {
                setErrorMessage("Failed to fetch quizzes.");
            }
        };
        fetchQuizzes();
    }, [setErrorMessage]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createQuestion(selectedQuiz, {questionText});
            setSuccessMessage("Question created successfully.");
            setShowModal(false);
            const response = await getAllQuestions();
            setQuestions(response.data);
        } catch (error) {
            setErrorMessage("Failed to create question.");
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="quizId">
                        <Form.Label>Quiz</Form.Label>
                        <Form.Control as="select" value={selectedQuiz} onChange={(e) => setSelectedQuiz(e.target.value)}
                                      required>
                            <option value="">Select Quiz</option>
                            {quizzes.map((quiz) => (
                                <option key={quiz.quizId} value={quiz.quizId}>{quiz.title}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="questionText">
                        <Form.Label>Question Text</Form.Label>
                        <Form.Control type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)}
                                      required/>
                    </Form.Group>
                    <Button type="submit" className="defaultBtn mt-3">Create</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateQuestionForm;