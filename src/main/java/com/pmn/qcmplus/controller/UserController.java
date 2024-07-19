package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.dto.UserWithRolesDTO;
import com.pmn.qcmplus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserWithRolesDTO>> getAllUsers() {
        List<UserWithRolesDTO> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public UserWithRolesDTO getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @GetMapping("/exists/{id}")
    public boolean existsById(@PathVariable Integer id) {
        return userService.existsById(id);
    }

    @PostMapping
    public UserWithRolesDTO saveUser(@RequestBody UserWithRolesDTO userWithRolesDTO) {
        return userService.saveUser(userWithRolesDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public UserWithRolesDTO updateUser(@PathVariable Integer id, @RequestBody UserWithRolesDTO userWithRolesDTO) {
        return userService.updateUser(id, userWithRolesDTO);
    }
}
