package lk.ijse.backend.config;

import lk.ijse.backend.service.AuthService;
import lk.ijse.backend.service.impl.OAuth2LoginSuccessHandler;
import lk.ijse.backend.util.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserDetailsService USERDETAILSSERVICE;
    private final JwtAuthFilter JWTAUTHFILTER;
    private final PasswordEncoder PASSWORDENCODER;
    private final AuthService AUTHSERVICE;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth-> auth
                        .requestMatchers(
                                "/", "/login**",
                                "/auth/**",
                                "/api/packages/**",
                                "/api/destinations/**",
                                "/api/feedback/**",
                                "/api/contacts/**",
                                "/api/allDestinations/**",
                                "/api/galleries/**",
                                "/api/packageBooking/**",
                                "/api/guides/**",
                                "/uploads/guides/**",
                                "/api/travelTips/**",
                                "/api/vehicles/**",
                                "/api/vehicleCategories/**",
                                "/api/vehicleFleets/**",
                                "/api/rentalProcessSteps/**",
                                "/api/payments/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(o -> o
                        .defaultSuccessUrl("/oauth2/success", true)
                )
                .sessionManagement(session-> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(JWTAUTHFILTER,
                        UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider
                = new DaoAuthenticationProvider();
        daoAuthenticationProvider
                .setUserDetailsService(USERDETAILSSERVICE);
        daoAuthenticationProvider
                .setPasswordEncoder(PASSWORDENCODER);
        return daoAuthenticationProvider;
    }
}