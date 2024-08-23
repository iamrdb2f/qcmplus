import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Modal, Spinner} from "react-bootstrap";
import {createQuestion, getAllQuestions} from "../../services/QuestionService";
import {createAnswer} from "../../services/AnswerService";
import {retrieveQuizzes} from "../../services/QuizService";

const CreateQuestionForm = ({showModal, setShowModal, setSuccessMessage, setErrorMessage, setQuestions}) => {
    const [questionText, setQuestionText] = useState('');
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [answers, setAnswers] = useState([{answerText: '', isCorrect: false}]);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const handleAddAnswer = () => {
        setAnswers([...answers, {answerText: '', isCorrect: false}]);
    };

    const handleRemoveAnswer = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    const handleAnswerChange = (index, field, value) => {
        const newAnswers = answers.map((answer, i) => i === index ? {...answer, [field]: value} : answer);
        setAnswers(newAnswers);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (questionText.trim() === '' || selectedQuiz === '' || answers.some(answer => answer.answerText.trim() === '')) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const dataQuestion = {
                questionText,
                quiz: {quizId: selectedQuiz}
            };

            const createdQuestion = await createQuestion(dataQuestion);
            const questionId = createdQuestion.data.questionId;

            for (const answer of answers) {
                const dataAnswer = {
                    answerText: answer.answerText,
                    correct: answer.isCorrect,
                    question: {questionId}
                };
                await createAnswer(dataAnswer);
            }

            setQuestionText('');
            setSelectedQuiz('');
            setAnswers([{answerText: '', isCorrect: false}]);
            setLoading(false);
            setShowModal(false);
            setSuccessMessage("Question and answers created successfully.");
            const response = await getAllQuestions();
            setQuestions(response.data);
        } catch (error) {
            setErrorMessage("Failed to create question and answers.");
            setLoading(false);
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="quizSelect">
                        <Form.Label>Select Quiz</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedQuiz}
                            onChange={(e) => setSelectedQuiz(e.target.value)}
                            required
                        >
                            <option value="">Select a quiz</option>
                            {quizzes.map((quiz) => (
                                <option key={quiz.quizId} value={quiz.quizId}>
                                    {quiz.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="questionText" className="mt-3">
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter question text"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {answers.map((answer, index) => (
                        <div key={index} className="mt-3">
                            <Form.Group controlId={`answerText${index}`}>
                                <Form.Label>Answer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter answer text"
                                    value={answer.answerText}
                                    onChange={(e) => handleAnswerChange(index, 'answerText', e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={`isCorrect${index}`} className="mt-2">
                                <Form.Check
                                    type="checkbox"
                                    label="Correct Answer"
                                    checked={answer.isCorrect}
                                    onChange={(e) => handleAnswerChange(index, 'isCorrect', e.target.checked)}
                                />
                            </Form.Group>
                            <Button variant="danger" className="mt-2" onClick={() => handleRemoveAnswer(index)}>Remove
                                Answer</Button>
                        </div>
                    ))}
                    <Button variant="secondary" className="m-3" onClick={handleAddAnswer}>Add Answer</Button>
                    <Button type="submit" className="defaultBtn m-3" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm"/> : "Create Question"}
                    </Button>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateQuestionForm;