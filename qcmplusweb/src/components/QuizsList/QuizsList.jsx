import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table, Button } from "react-bootstrap";
import {retrieveQuizzes} from "../../services/QuizService";

const QuizsList = ({ title }) => {
    const [quizzes, setQuizzes] = useState([]); // State to store quizzes
    const [searchTerm, setSearchTerm] = useState(""); // State for search input

    // Fetch quizzes when component mounts
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await retrieveQuizzes(); // Fetch quizzes from the API
                setQuizzes(response.data); // Set quizzes to the state
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchQuizzes();
    }, []);

    // Filter quizzes based on search term
    const filteredQuizzes = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Row className="mb-3">
                <Col>
                    <h4 className="text-start mb-3">{title}</h4>
                </Col>
                <Col>
                    <div className="search-bar">
                        <Form.Control
                            type="text"
                            placeholder="Search for quiz by title"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                    </div>
                </Col>
            </Row>
            <Table striped bordered hover className="small-font">
                <thead>
                <tr>
                    <th>N°</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map((quiz, index) => (
                        <tr key={quiz.id}>
                            <td>{index +1}</td>
                            <td>{quiz.title}</td>
                            <td>{quiz.description}</td>
                            <td>
                                <Button variant="success" size="sm">View</Button>
                                <Button variant="warning" size="sm" className="ms-2">Edit</Button>
                                <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">No quizzes found</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
};

export default QuizsList;
