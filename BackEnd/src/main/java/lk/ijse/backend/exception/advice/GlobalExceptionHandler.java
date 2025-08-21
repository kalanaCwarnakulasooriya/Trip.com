package lk.ijse.backend.exception.advice;

import io.jsonwebtoken.ExpiredJwtException;
import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.exception.JwtAuthenticationException;
import lk.ijse.backend.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public APIResponse handleValidationExceptions(MethodArgumentNotValidException ex) {
        return new APIResponse(
                400,
                "Validation exception",
                ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public APIResponse handleUserNotFoundException
            (UserNotFoundException e) {
        return new APIResponse(
                404,
                "User not found" ,
                e.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public APIResponse handleUsernameNotFoundException
            (UsernameNotFoundException e) {
        return new APIResponse(
                409,
                "Username not found",
                e.getMessage());
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public APIResponse handleJwtAuthenticationException(JwtAuthenticationException e) {
        return new APIResponse(
                409,
                "Jwt authentication exception",
                e.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public APIResponse handleBadCredentialsException(BadCredentialsException e) {
        return new APIResponse(
                401,
                "Unauthorized",
                "Invalid username or password");
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public APIResponse handleExpiredJwtException(ExpiredJwtException e) {
        return new APIResponse(
                401,
                "Unauthorized",
                "Expired jwt Token");
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public APIResponse handleRuntimeException(RuntimeException e) {
        return new APIResponse(
                500,
                "Internal server error",
                e.getMessage());
    }
}