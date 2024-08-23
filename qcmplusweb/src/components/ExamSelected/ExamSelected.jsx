import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {retrieveQuizze} from '../../services/QuizService';
import './ExamSelected.css';

const ExamSelected = ({quizId, onStartExam}) => {
    const [quizze, setQuizze] = useState({});
    const [error, setError] = useState(null); // Add error state to manage errors

    const Img = ({title = 'QCMPlus', link = `Images/${quizze.title}.jpg`}) => {
        return (
            <div className="img-container">
                <img src={link} alt={title} className="img-fluid"/>
            </div>
        );
    };

    useEffect(() => {
        const fetchQuizze = async () => {
            try {
                const response = await retrieveQuizze(quizId);
                setQuizze(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
                setError('Failed to load quiz. Please try again later.');
            }
        };

        fetchQuizze();
    }, [quizId]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="center-container p-0 m-0">
            <Card className="selectExamen-card">
                <Img title={quizze.title}/>
                <Card.Body className="text-center">
                    <Card.Title className="text-bold">{quizze.title}</Card.Title>
                    <Card.Text>{quizze.description}</Card.Text>
                    <Card.Text>Vous aurez 15 questions à répondre</Card.Text>
                    <Button className="defaultBtn text-center" onClick={onStartExam}>
                        Start Exam
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ExamSelected;
