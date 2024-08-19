import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table, Button } from "react-bootstrap";
import { getAnswersByQuestionId, deleteAnswer } from '../../services/AnswerService'; // Assurez-vous que l'import de l'API est correct

const AnswersList = ({ title, questionId }) => {
    const [answers, setAnswers] = useState([]); // État pour stocker les réponses
    const [searchTerm, setSearchTerm] = useState(''); // État pour la barre de recherche

    // Fonction pour récupérer les réponses depuis l'API
    const fetchAnswers = async () => {
        try {
            const response = await getAnswersByQuestionId(questionId); // Utilisation de l'API
            console.log("Data fetched from API:", response.data); // Vérification des données reçues
            setAnswers(response.data); // Mise à jour du state avec les réponses
        } catch (error) {
            console.error("Error fetching answers:", error);
        }
    };

    useEffect(() => {
        fetchAnswers();
    }, [questionId]); // Appel à l'API lorsque le component se monte ou quand questionId change

    // Fonction pour supprimer une réponse
    const handleDelete = async (id) => {
        try {
            await deleteAnswer(id);
            fetchAnswers(); // Récupérer à nouveau les réponses après suppression
        } catch (error) {
            console.error("Error deleting answer:", error);
        }
    };

    // Filtrage des réponses en fonction du terme de recherche
    const filteredAnswers = answers.filter((answer) =>
        answer.answers_text.toLowerCase().includes(searchTerm.toLowerCase())
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
                            placeholder="Search for answer text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Gestion de la recherche
                        />
                    </div>
                </Col>
            </Row>
            <Table striped bordered hover className="small-font">
                <thead>
                <tr>
                    <th>Answer ID</th>
                    <th>Question ID</th>
                    <th>Answer Text</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {answers.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="text-center">
                            No answers available for this question
                        </td>
                    </tr>
                ) : (
                    filteredAnswers.length > 0 ? (
                        filteredAnswers.map((answer) => (
                            <tr key={answer.id}>
                                <td>{answer.id}</td>
                                <td>{answer.questionId}</td>
                                <td>{answer.answers_text}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(answer.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No answers match your search
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        </>
    );
};

export default AnswersList;

