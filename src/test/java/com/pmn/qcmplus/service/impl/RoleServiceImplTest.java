package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RoleServiceImplTest {

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleServiceImpl roleService;

    @Test
    public void testCreateRole() {
        // Arrange
        Role role = new Role(null, "ADMIN");
        when(roleRepository.save(any(Role.class))).thenReturn(new Role(1, "ADMIN"));

        // Act
        Role createdRole = roleService.createRole(role);

        // Assert
        assertNotNull(createdRole);
        assertEquals(1, createdRole.getId());
        assertEquals("ADMIN", createdRole.getRoleName());
    }

    @Test
    public void testGetRoleById() {
        // Arrange
        Role role = new Role(1, "USER");
        when(roleRepository.findById(1)).thenReturn(Optional.of(role));

        // Act
        Role foundRole = roleService.getRoleById(1);

        // Assert
        assertNotNull(foundRole);
        assertEquals(1, foundRole.getId());
        assertEquals("USER", foundRole.getRoleName());
    }

    @Test
    public void testDeleteRole() {
        // Arrange
        doNothing().when(roleRepository).deleteById(1);

        // Act
        roleService.deleteRole(1);

        // Assert & Verify
        verify(roleRepository, times(1)).deleteById(1);
    }
}
