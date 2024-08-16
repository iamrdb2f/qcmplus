package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")  // Optional, if you have a specific profile for tests
public class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @BeforeEach
    void setUp() {
        roleRepository.deleteAll();
    }

    @Test
    public void testSaveRole() {
        Role role = new Role(null, "ADMIN");
        Role savedRole = roleRepository.save(role);

        assertNotNull(savedRole.getId());
        assertEquals("ADMIN", savedRole.getRoleName());
    }

    @Test
    public void testFindRoleById() {
        Role role = new Role(null, "USER");
        roleRepository.save(role);

        Optional<Role> foundRole = roleRepository.findById(role.getId());
        assertTrue(foundRole.isPresent());
        assertEquals("USER", foundRole.get().getRoleName());
    }

    @Test
    public void testFindAllRoles() {
        Role role1 = new Role(null, "ADMIN");
        Role role2 = new Role(null, "USER");

        roleRepository.save(role1);
        roleRepository.save(role2);

        List<Role> roles = roleRepository.findAll();
        assertEquals(2, roles.size());
    }

    @Test
    public void testDeleteRole() {
        Role role = new Role(null, "USER");
        roleRepository.save(role);

        roleRepository.deleteById(role.getId());

        Optional<Role> deletedRole = roleRepository.findById(role.getId());
        assertFalse(deletedRole.isPresent());
    }

    @Test
    public void testUpdateRole() {
        Role role = new Role(null, "USER");
        role = roleRepository.save(role);

        role.setRoleName("ADMIN");
        Role updatedRole = roleRepository.save(role);

        assertEquals("ADMIN", updatedRole.getRoleName());
    }
}
