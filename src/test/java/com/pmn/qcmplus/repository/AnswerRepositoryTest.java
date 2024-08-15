package com.pmn.qcmplus.repository;
/*
import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.Question;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class AnswerRepositoryTest {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    private Question question;

    @BeforeEach
    void setUp() {
        question = new Question();
        question.setQuestionText("Quelle commande SQL est utilisée pour extraire des données d’une base de données?");
        question = questionRepository.save(question);

        Answer answer1 = new Answer();
        answer1.setQuestion(question);
        answer1.setAnswerText("SELECT");
        answer1.setCorrect(true);

        Answer answer2 = new Answer();
        answer2.setQuestion(question);
        answer2.setAnswerText("INSERT");
        answer2.setCorrect(false);

        answerRepository.save(answer1);
        answerRepository.save(answer2);
    }

    @Test
    void testFindByQuestion_QuestionId() {
        List<Answer> answers = answerRepository.findByQuestion_QuestionId(question.getQuestionId());
        assertEquals(2, answers.size());
        assertTrue(answers.stream().anyMatch(a -> "SELECT".equals(a.getAnswerText()) && a.isCorrect()));
        assertTrue(answers.stream().anyMatch(a -> "INSERT".equals(a.getAnswerText()) && !a.isCorrect()));
    }
}

 */
