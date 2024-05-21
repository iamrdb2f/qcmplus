import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

const Qcm = () => {
    const [firstNum, setFirstNum] = useState("");
    const [secondNum, setSecondNum] = useState("");
    const [result, setResult] = useState("");

    const handleMultiply = (event) => {
        event.preventDefault();
        setResult(firstNum * secondNum);
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2>Multiplication Calculator</h2>
                    <Form onSubmit={handleMultiply}>
                        <Form.Group controlId="formFirstNum">
                            <Form.Label>First Number</Form.Label>
                            <Form.Control type="number" value={firstNum} onChange={(e) => setFirstNum(e.target.value)}
                                          required/>
                        </Form.Group>

                        <Form.Group controlId="formSecondNum">
                            <Form.Label>Second Number</Form.Label>
                            <Form.Control type="number" value={secondNum} onChange={(e) => setSecondNum(e.target.value)}
                                          required/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Multiply
                        </Button>
                    </Form>
                    {result &&
                        <h4 className="mt-3">Result: {result}</h4>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Qcm;