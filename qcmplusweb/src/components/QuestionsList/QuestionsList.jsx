import React from "react";
import {Col, Form, Row, Table} from "react-bootstrap";

const QuestionsList = ({title}) => {
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
                            placeholder="Search for user by name question"
                        />
                    </div>
                </Col>
            </Row>
            <Table striped bordered hover className="small-font">
                <thead>
                <tr>
                    <th>N°</th>
                    <th>Quizs_id</th>
                    <th>Questions_text</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </>
    );
};

export default QuestionsList;