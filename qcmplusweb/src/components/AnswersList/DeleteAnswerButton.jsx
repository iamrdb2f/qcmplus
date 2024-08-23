import React, {useState} from "react";
import {Alert, Button, Spinner} from "react-bootstrap";
import {deleteAnswer} from "../../services/AnswerService";

const DeleteAnswerButton = ({answerId, fetchAnswers}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteAnswer(answerId);
            fetchAnswers();
        } catch (error) {
            setError("Error deleting answer.");
            console.error("Error deleting answer:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm"/> : "Delete"}
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
        </>
    );
};

export default DeleteAnswerButton;