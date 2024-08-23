import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {createQuiz, updateQuiz} from "../../services/QuizService";

const QuizForm = ({
                      showModal,
                      setShowModal,
                      modalType,
                      currentQuiz,
                      setQuizzes,
                      quizzes,
                      setErrorMessage,
                      setSuccessMessage,
                      fetchQuizzes
                  }) => {
    const [quizData, setQuizData] = useState({title: "", description: ""});

    useEffect(() => {
        if (modalType === "edit" && currentQuiz) {
            setQuizData({title: currentQuiz.title, description: currentQuiz.description});
        } else {
            setQuizData({title: "", description: ""});
        }
    }, [modalType, currentQuiz]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (modalType === "create") {
                const response = await createQuiz(quizData);
                setQuizzes([...quizzes, response.data]);
                setSuccessMessage("Quiz created successfully.");
            } else {
                const response = await updateQuiz(currentQuiz.quizId, quizData);
                setQuizzes(quizzes.map((quiz) => (quiz.quizId === currentQuiz.quizId ? response.data : quiz)));
                setSuccessMessage("Quiz updated successfully.");
            }
            setShowModal(false);
            setErrorMessage("");
            fetchQuizzes();
        } catch (error) {
            console.error("Error submitting quiz:", error);
            setErrorMessage("Error submitting quiz. Please try again later.");
            setSuccessMessage("");
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{modalType === "create" ? "Create Quiz" : "Edit Quiz"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="quizTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={quizData.title}
                            onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="quizDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={quizData.description}
                            onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" className="defaultBtn mt-3">
                        {modalType === "create" ? "Create" : "Update"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default QuizForm;