import React, {useCallback, useEffect, useState} from 'react';
import {Card, Carousel} from 'react-bootstrap';
import './ExamHistory.css';
import {getAllUserExamHistory} from "../../services/ExamService";

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
            const response = await getAllUserExamHistory(userId);
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

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
                                        <Card.Title className="text-bold text-decoration-underline">
                                            {exam.quiz ? exam.quiz.title : 'No Title Available'}
                                        </Card.Title>
                                        <Card.Text>Result: {exam.score}</Card.Text>
                                        <Card.Text>Time Spent: {exam.timeSpent}h</Card.Text>
                                        <Card.Text>Date: {formatDate(exam.dateExam)}</Card.Text>
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
