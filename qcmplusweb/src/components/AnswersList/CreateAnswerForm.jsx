import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {createAnswer} from "../../services/AnswerService";
import {getAllQuestions} from "../../services/QuestionService";

const CreateAnswerForm = ({fetchAnswers, setShowModal, setSuccessMessage}) => {
    const [newAnswerText, setNewAnswerText] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getAllQuestions();
                setQuestions(response.data);
            } catch (error) {
                setError("Error fetching questions.");
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    const handleCreate = async () => {
        if (newAnswerText.trim() === '' || selectedQuestion === '') return;
        setLoading(true);
        setError(null);
        try {
            const dataAnswer = {
                answerText: newAnswerText,
                question: {questionId: selectedQuestion},
                correct: isCorrect
            };
            await createAnswer(dataAnswer);
            setNewAnswerText('');
            setSelectedQuestion('');
            setIsCorrect(false);
            setLoading(false);
            setShowModal(false);
            setSuccessMessage("Answer created successfully.");
            fetchAnswers();
        } catch (error) {
            setError("Error creating answer.");
            console.error("Error creating answer:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <Form.Group controlId="questionSelect">
                <Form.Label>Select Question</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedQuestion}
                    onChange={(e) => setSelectedQuestion(e.target.value)}
                    className="text-dark"
                >
                    <option value="">Select a question</option>
                    {questions.map((question) => (
                        <option key={question.questionId} value={question.questionId}>
                            {question.questionText}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="answerText" className="mt-3">
                <Form.Label>Answer Text</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter new answer"
                    value={newAnswerText}
                    onChange={(e) => setNewAnswerText(e.target.value)}
                    className="text-dark"
                />
            </Form.Group>
            <Form.Group controlId="isCorrect" className="mt-3">
                <Form.Check
                    type="checkbox"
                    label="Correct Answer"
                    checked={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.checked)}
                />
            </Form.Group>
            <Button variant="primary" onClick={handleCreate} disabled={loading} className="defaultBtn mt-3">
                {loading ? <Spinner animation="border" size="sm"/> : "Add New Answer"}
            </Button>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </>
    );
};

export default CreateAnswerForm;