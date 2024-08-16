package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.Question;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class AnswerRepositoryTest {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    private Question question;
    private Answer answer1;
    private Answer answer2;

    @BeforeEach
    void setUp() {
        question = new Question(null, null, "Sample question");
        questionRepository.save(question);

        answer1 = new Answer(null, question, "Answer 1", true);
        answer2 = new Answer(null, question, "Answer 2", false);

        answerRepository.save(answer1);
        answerRepository.save(answer2);
    }

    @Test
    void testFindAll() {
        List<Answer> answers = answerRepository.findAll();
        assertEquals(2, answers.size());
    }

    @Test
    void testFindById() {
        Optional<Answer> foundAnswer = answerRepository.findById(answer1.getAnswerId());
        assertTrue(foundAnswer.isPresent());
    }

    @Test
    void testSave() {
        Answer newAnswer = new Answer(null, question, "Answer 3", true);
        Answer savedAnswer = answerRepository.save(newAnswer);
        assertNotNull(savedAnswer.getAnswerId());
    }

    @Test
    void testDeleteById() {
        answerRepository.deleteById(answer1.getAnswerId());
        Optional<Answer> foundAnswer = answerRepository.findById(answer1.getAnswerId());
        assertFalse(foundAnswer.isPresent());
    }

    @Test
    void testFindByQuestionId() {
        List<Answer> answers = answerRepository.findByQuestion_QuestionId(question.getQuestionId());
        assertEquals(2, answers.size());
    }
}
