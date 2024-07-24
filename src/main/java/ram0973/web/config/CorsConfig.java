package ram0973.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        //config.addAllowedOrigin("http://localhost:5173");
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return source;
    }

//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
////        configuration.setAllowedOrigins(
////            List.of("http://localhost:5173", "http://localhost:5173/", "http://localhost")
////        ); // React
//
//        configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"));
//
//        configuration.applyPermitDefaultValues();
////        configuration.setAllowedHeaders(List.of(
////            "Origin", //OPTIONS
////            "Access-Control-Allow-Headers",
////            "Access-Control-Allow-Origin",
////            "Access-Control-Request-Method", //OPTIONS
////            "Access-Control-Request-Headers", //OPTIONS optionally
////            "Cache-Control",
////            "Content-Type",
////            "Authorization",
////            "X-Requested-With",
////            "Accept"
////        ));
//        configuration.setAllowCredentials(true);
//        configuration.addAllowedOrigin("http://localhost:5173");
//        configuration.addAllowedOrigin("http://127.0.0.1:5173");
//        configuration.addAllowedOrigin("http://127.0.0.1:8080");
//        configuration.addAllowedOrigin("http://localhost:8080");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}
