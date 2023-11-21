package com.academiq.security;

import com.academiq.security.auth.AuthenticationService;
import com.academiq.security.auth.RegisterRequest;
import com.academiq.security.user.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import static com.academiq.security.user.Role.STUDENT;
import static com.academiq.security.user.Role.EMPLOYEE;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class AcademIQApplication {

	public static void main(String[] args) {
		SpringApplication.run(AcademIQApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner commandLineRunner(
//			AuthenticationService service
//	) {
//		return args -> {
//			var admin = RegisterRequest.builder()
//					.firstname("Student")
//					.lastname("student")
//					.email("student@mail.com")
//					.password("password")
//					.role(STUDENT)
//					.build();
//			System.out.println("Admin token: " + service.register(admin).getAccessToken());
//
//			var manager = RegisterRequest.builder()
//					.firstname("Employee")
//					.lastname("Employee")
//					.email("employee@mail.com")
//					.password("password")
//					.role(EMPLOYEE)
//					.build();
//			System.out.println("Manager token: " + service.register(manager).getAccessToken());

//		};
//	}
}
