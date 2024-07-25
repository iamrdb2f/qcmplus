package com.pmn.qcmplus.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderUtil {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode("password");
        System.out.println(encodedPassword);

        String encodedPassword2 = encoder.encode("admin");
        System.out.println(encodedPassword2); // Store this in your database
    }
}