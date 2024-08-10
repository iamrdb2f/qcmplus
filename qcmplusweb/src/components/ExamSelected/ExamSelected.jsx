import React, {useEffect, useState} from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {retrieveQuizze} from '../../services/QuizService';
import './ExamSelected.css';

const ExamSelected = ({quizId}) => {
    const [quizze, setQuizze] = useState({});
    const navigate = useNavigate();

    const Img = ({title = 'QCMPlus', link = `Images/${quizze.title}.jpg`}) => {
        return (<div className="img-container">
                <img src={link} alt={title} className="img-fluid"/>
            </div>);
    };

    useEffect(() => {
        const fetchQuizze = async () => {
            try {
                const response = await retrieveQuizze(quizId);
                setQuizze(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuizze();
    }, [quizId]);

    const handleStartExam = () => {
        console.log(quizId)
        //navigate(`/exam/${quizId}`); // Navigate to the Exam component
    };

    return (<>
            <Card className="selectExamen-card">
                <Img title={quizze.title}/>
                <Card.Body className="text-center">
                    <Card.Title className="text-bold">{quizze.title}</Card.Title>
                    <Card.Text>{quizze.description}</Card.Text>
                    <Card.Text>Vous aurez 15 questions à répondre</Card.Text>
                    <Button className="defaultBtn text-center" onClick={handleStartExam}>Start Exam</Button>
                </Card.Body>
            </Card>
        </>);
};

export default ExamSelected;
