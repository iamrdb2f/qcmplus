import React, {useEffect, useState} from "react";
import {Col, Form, Row, Table, Button} from "react-bootstrap";
import {getQuestions} from "../../services/ExamService";  // Assumes an API call for fetching exams

const ExamsList = ({title}) => {
    const [exams, setExams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await getQuestions();
                setExams(response.data);  // Assuming data is the exams list
            } catch (error) {
                console.error("Failed to fetch exams:", error);
            }
        };
        fetchExams();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredExams = exams.filter((exam) =>
        exam.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.quiz_id.toLowerCase().includes(searchTerm.toLowerCase())
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
                            placeholder="Search for user or quiz by name"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </Col>
            </Row>
            <Table striped bordered hover className="small-font">
                <thead>
                <tr>
                    <th>N°</th>
                    <th>Users_id</th>
                    <th>Quizs_id</th>
                    <th>Scores</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredExams.length > 0 ? (
                    filteredExams.map((exam, index) => (
                        <tr key={exam.id}>
                            <td>{index + 1}</td>
                            <td>{exam.user_id}</td>
                            <td>{exam.quiz_id}</td>
                            <td>{exam.score}</td>
                            <td>
                                <Button variant="primary" size="sm">
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">
                            No exams found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
};

export default ExamsList;
