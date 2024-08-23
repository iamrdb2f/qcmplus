import React, {useEffect, useState} from "react";
import {retrieveUsers} from "../../services/UserService";
import {getAllQuestions} from "../../services/QuestionService";
import {retrieveQuizzes} from "../../services/QuizService";
import {getAllExamSession} from "../../services/ExamService";
import {getAllAnswers} from "../../services/AnswerService";
import {ROLE} from "../../utils/UtilLists";
import {FaBook, FaCommentAlt, FaFileAlt, FaQuestionCircle, FaUserGraduate, FaUserShield} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const [adminCount, setAdminCount] = useState(0);
    const [traineeCount, setTraineeCount] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const [examCount, setExamCount] = useState(0);
    const [answerCount, setAnswerCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await retrieveUsers();
                const admins = usersResponse.data.filter(user => user.role && user.role.id === ROLE.ADMIN.value);
                const trainees = usersResponse.data.filter(user => user.role && user.role.id === ROLE.USER.value);
                setAdminCount(admins.length);
                setTraineeCount(trainees.length);

                const questionsResponse = await getAllQuestions();
                setQuestionCount(questionsResponse.data.length);

                const quizzesResponse = await retrieveQuizzes();
                setQuizCount(quizzesResponse.data.length);

                const examsResponse = await getAllExamSession();
                setExamCount(examsResponse.data.length);

                const answersResponse = await getAllAnswers();
                setAnswerCount(answersResponse.data.length);
            } catch (error) {
                 setErrorMessage("Error fetching data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="d-flex justify-content-around flex-wrap">
                <div className="card">
                    <div className="card-body text-center">
                        <FaUserShield size={50} className="icon" />
                        <h4 className="card-title mt-2">Administrateurs</h4>
                        <p className="text-center count">{adminCount}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <FaUserGraduate size={50} className="icon" />
                        <h4 className="card-title mt-2">Trainees</h4>
                        <p className="text-center count">{traineeCount}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <FaQuestionCircle size={50} className="icon" />
                        <h4 className="card-title mt-2">Questions</h4>
                        <p className="text-center count">{questionCount}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <FaFileAlt size={50} className="icon" />
                        <h4 className="card-title mt-2">Quizzes</h4>
                        <p className="text-center count">{quizCount}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <FaBook size={50} className="icon" />
                        <h4 className="card-title mt-2">Examens</h4>
                        <p className="text-center count">{examCount}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        <FaCommentAlt size={50} className="icon" />
                        <h4 className="card-title mt-2">Réponses</h4>
                        <p className="text-center count">{answerCount}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;