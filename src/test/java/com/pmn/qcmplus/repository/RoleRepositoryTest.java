package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.service.impl.RoleServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RoleRepositoryTest {

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleServiceImpl roleService;

    private Role role;

    @BeforeEach
    void setUp() {
        role = new Role(null, "ADMIN");

        // Only use lenient() if necessary, otherwise remove unused stubbings
        lenient().when(roleRepository.save(any(Role.class))).thenAnswer(invocation -> {
            Role savedRole = invocation.getArgument(0);
            savedRole.setId(1); // Simulate setting the ID after saving
            return savedRole;
        });

        lenient().when(roleRepository.findById(anyInt())).thenReturn(Optional.of(role));
        lenient().when(roleRepository.findAll()).thenReturn(Arrays.asList(role, new Role(2, "USER")));
    }

    @Test
    public void testSaveRole() {
        Role savedRole = roleService.createRole(role);

        assertNotNull(savedRole.getId());
        assertEquals("ADMIN", savedRole.getRoleName());

        verify(roleRepository, times(1)).save(any(Role.class));
    }

    @Test
    public void testFindRoleById() {
        Role foundRole = roleService.getRoleById(1);

        assertNotNull(foundRole);
        assertEquals("ADMIN", foundRole.getRoleName());

        verify(roleRepository, times(1)).findById(1);
    }

    @Test
    public void testFindAllRoles() {
        List<Role> roles = roleService.getAllRoles();

        assertNotNull(roles);
        assertEquals(2, roles.size());

        verify(roleRepository, times(1)).findAll();
    }

    @Test
    public void testDeleteRole() {
        roleService.deleteRole(1);

        verify(roleRepository, times(1)).deleteById(1);
    }

    @Test
    public void testUpdateRole() {
        Role updatedRoleData = new Role(null, "USER");

        when(roleRepository.save(any(Role.class))).thenReturn(updatedRoleData);

        Role updatedRole = roleService.updateRole(1, updatedRoleData);

        assertNotNull(updatedRole);
        assertEquals("USER", updatedRole.getRoleName());

        verify(roleRepository, times(1)).findById(1);
        verify(roleRepository, times(1)).save(any(Role.class));
    }
}
