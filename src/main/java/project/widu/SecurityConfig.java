package project.widu;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()  // WebConfig에 설정한 CORS 정책을 사용하게 함
                .and()
                .csrf().disable() // 테스트 시 편의를 위해 CSRF 비활성화 (프로덕션에선 신중히)
                .authorizeRequests()
                .anyRequest().permitAll(); // 모든 요청 허용 (필요에 따라 변경)

        return http.build();
    }
}
