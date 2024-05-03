package com.qcmplus.qcmplus.repository;

import com.qcmplus.qcmplus.model.User;
import com.qcmplus.qcmplus.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("test@example.com");
        // don't set the userId here let JPA/Hibernate determine it when persisting
        // user.setUserId(1);
    }

    @Test
    void findByEmailAndUserIdNot() {
        User persistedUser = entityManager.persistAndFlush(user);
        // use the id of the persisted user
        Optional<User> foundUser = userRepository.findByEmailAndUserIdNot(user.getEmail(), persistedUser.getUserId() + 1);

        assertThat(foundUser.isPresent()).isEqualTo(true);
        assertThat(foundUser.get().getEmail()).isEqualTo(user.getEmail());
    }
}