package com.pmn.qcmplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = "com.pmn.qcmplus")
public class QcmplusApplication {
	public static void main(String[] args) {
		SpringApplication.run(QcmplusApplication.class, args);
	}
}
