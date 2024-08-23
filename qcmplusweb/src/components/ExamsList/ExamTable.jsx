import React from "react";
import {Button, Table} from "react-bootstrap";

const ExamTable = ({exams, handleEdit, handleDeleteClick}) => {
    return (
        <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
            <Table striped bordered hover className="small-font">
                <thead>
                <tr>
                    <th>N°</th>
                    <th>User Name</th>
                    <th>Quiz Title</th>
                    <th>Score</th>
                    <th>Time Spent</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {exams.length > 0 ? (
                    exams.map((exam, index) => (
                        <tr key={exam.sessionId}>
                            <td>{index + 1}</td>
                            <td>{exam.user?.firstName + ' ' + exam.user?.lastName.toUpperCase() || "No Name"}</td>
                            <td>{exam.quiz.title}</td>
                            <td>{exam.score}</td>
                            <td>{exam.timeSpent}</td>
                            <td>{new Date(exam.dateExam).toLocaleString()}</td>
                            <td>
                                <Button variant="warning" className={"me-3"}
                                        onClick={() => handleEdit(exam.sessionId)}>Update</Button>
                                <Button variant="danger" className={"ms-3"}
                                        onClick={() => handleDeleteClick(exam.sessionId)}>Delete</Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">No exams to display</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
};

export default ExamTable;