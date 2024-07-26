package com.pmn.qcmplus.security;

import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail( email)
                .orElseThrow(() -> new UsernameNotFoundException(email));

        // Log the retrieved user
        System.out.println("User found: " + user.getEmail());

        Set<GrantedAuthority> authorities = Collections.singleton(mapRoleToAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    private SimpleGrantedAuthority mapRoleToAuthority(Role role) {
        return new SimpleGrantedAuthority(role.getRoleName());
    }
}