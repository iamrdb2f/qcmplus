package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.Role;

import java.util.List;

public interface RoleService {
    Role createRole(Role role);
    Role getRoleById(Integer id);
    List<Role> getAllRoles();
    Role updateRole(Integer id, Role role);
    void deleteRole(Integer id);
}
