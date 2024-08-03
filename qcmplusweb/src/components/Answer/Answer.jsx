import React, { useState, useEffect } from 'react';
import { getAnswersByQuestionId, createAnswer, updateAnswer, deleteAnswer } from '../../services/AnswerService';
import { Button, Form, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const Answer = ({ questionId }) => {
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState({ answerText: '', isCorrect: false });

    useEffect(() => {
        const fetchAnswers = async () => {
            const response = await getAnswersByQuestionId(questionId);
            setAnswers(response.data);
        };
        fetchAnswers();
    }, [questionId]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAnswer({ ...newAnswer, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAnswer({ ...newAnswer, question: { questionId } });
        setNewAnswer({ answerText: '', isCorrect: false });
        const response = await getAnswersByQuestionId(questionId);
        setAnswers(response.data);
    };

    const handleUpdate = async (id, updatedAnswer) => {
        await updateAnswer(id, updatedAnswer);
        const response = await getAnswersByQuestionId(questionId);
        setAnswers(response.data);
    };

    const handleDelete = async (id) => {
        await deleteAnswer(id);
        const response = await getAnswersByQuestionId(questionId);
        setAnswers(response.data);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Answers</h4>
                    <ListGroup>
                        {answers.map((answer) => (
                            <ListGroup.Item key={answer.answerId}>
                                <Card>
                                    <Card.Body>
                                        <Card.Text>{answer.answerText}</Card.Text>
                                        <Card.Text>Correct: {answer.isCorrect.toString()}</Card.Text>
                                        <Button onClick={() => handleUpdate(answer.answerId, { ...answer, answerText: "Updated Text" })}>Update</Button>
                                        <Button onClick={() => handleDelete(answer.answerId)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Answer Text</Form.Label>
                            <Form.Control type="text" name="answerText" value={newAnswer.answerText} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="checkbox" name="isCorrect" label="Correct" checked={newAnswer.isCorrect} onChange={handleInputChange} />
                        </Form.Group>
                        <Button type="submit">Add Answer</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Answer;
