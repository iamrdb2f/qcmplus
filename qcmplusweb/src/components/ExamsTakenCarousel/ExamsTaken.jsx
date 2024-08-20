import React, {useCallback, useEffect, useState} from 'react';
import {Card, Carousel} from 'react-bootstrap';
import './ExamsTaken.css';
import {getAllUserTakenExam} from "../../services/ExamService";

const ExamTaken = ({userId}) => {
    const [examsTaken, setExamsTaken] = useState([]);
    const [error, setError] = useState(null);

    const Img = ({title}) => {
        const link = title ? `Images/${title}.jpg` : 'Images/default.jpg';
        return (
            <div className="img-container">
                <img src={link} alt={title || 'Default Image'} className="img-fluid"/>
            </div>
        );
    };

    const fetchExams = useCallback(async () => {
        try {
            const response = await getAllUserTakenExam(userId);
            setExamsTaken(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
            setError('Failed to load exams. Please try again later.');
        }
    }, [userId]);

    useEffect(() => {
        fetchExams();
    }, [fetchExams]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    const chunkedExamsTaken = chunkArray(examsTaken, 4);

    return (
        <>
            <h3 className="text-bold text-center p-4">Evaluate Your Skills: Take the Quiz</h3>
            <Carousel className="exam-taken-list" indicators={false}>
                {chunkedExamsTaken.map((examChunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                            {examChunk.map((exam, examIndex) => (
                                <Card key={examIndex} className="m-2" style={{width: '18rem'}}>
                                    <Img title={exam.quiz ? exam.quiz.title : null}/>
                                    <Card.Body className="text-center">
                                        <Card.Title className="text-bold">
                                            {exam.quiz ? exam.quiz.title : 'No Title Available'}
                                        </Card.Title>
                                        <Card.Text>Score: {exam.score}%</Card.Text>
                                        <Card.Text>Time Spent: {exam.timeSpent}</Card.Text>
                                        <Card.Text>Date: {exam.dateTime}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
};

export default ExamTaken;
