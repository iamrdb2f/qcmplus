package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.JwtAuthResponse;
import com.pmn.qcmplus.model.LoginDto;
import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.repository.UserRepository;
import com.pmn.qcmplus.security.JwtTokenProvider;
import com.pmn.qcmplus.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());


        String userEmail = null;
        String userLastName = null;
        String userFirstName = null;
        String role = null;
        String userJob = null;

        if (userOptional.isPresent()) {
            User loggedInUser = userOptional.get();
            Optional<Role> optionalRole = Optional.ofNullable(loggedInUser.getRole());
            userEmail = loggedInUser.getEmail();
            userLastName = loggedInUser.getLastName();
            userFirstName = loggedInUser.getFirstName();
            if (optionalRole.isPresent()) {
                Role userRole = optionalRole.get();
                role = userRole.getRoleName();
            }
            userJob = loggedInUser.getJobTitle();

        }

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setUserEmail(userEmail);
        jwtAuthResponse.setUserLastName(userLastName);
        jwtAuthResponse.setUserFirstName(userFirstName);
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setUserJob(userJob);

        return jwtAuthResponse;
    }
}
