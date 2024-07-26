package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.JwtAuthResponse;
import com.pmn.qcmplus.model.LoginDto;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
}
