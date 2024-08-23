import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {getAllQuestions, updateQuestion} from "../../services/QuestionService";
import {retrieveQuizzes} from "../../services/QuizService";

const UpdateQuestionForm = ({
                                showModal,
                                setShowModal,
                                currentQuestion,
                                setSuccessMessage,
                                setErrorMessage,
                                setQuestions
                            }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [questionText, setQuestionText] = useState(currentQuestion?.questionText || "");
    const [selectedQuiz, setSelectedQuiz] = useState(currentQuestion?.quiz.quizId || "");

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
            await updateQuestion(currentQuestion.questionId, selectedQuiz, {questionText});
            setSuccessMessage("Question updated successfully.");
            setShowModal(false);
            const response = await getAllQuestions();
            setQuestions(response.data);
        } catch (error) {
            setErrorMessage("Failed to update question.");
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Question</Modal.Title>
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
                    <Button type="submit" className="defaultBtn mt-3">Update</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateQuestionForm;