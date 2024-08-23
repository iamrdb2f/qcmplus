// src/components/AnswersList/CreateAnswerForm.jsx
import React, {useState} from "react";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {createAnswer} from "../../services/AnswerService";

const CreateAnswerForm = ({fetchAnswers}) => {
    const [newAnswerText, setNewAnswerText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async () => {
        if (newAnswerText.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            const dataAnswer = {answerText: newAnswerText, questionId: 1, isCorrect: false};
            await createAnswer(dataAnswer);
            setNewAnswerText('');
            fetchAnswers();
        } catch (error) {
            setError("Error creating answer.");
            console.error("Error creating answer:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <Form.Control
                type="text"
                placeholder="Enter new answer"
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
                className="text-dark"
            />
            <Button variant="primary" onClick={handleCreate} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm"/> : "Add Answer"}
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
        </>
    );
};

export default CreateAnswerForm;