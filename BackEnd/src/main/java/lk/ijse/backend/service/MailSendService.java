package lk.ijse.backend.service;

public interface MailSendService {
    void sendRegisteredEmail(String name, String email, String subject);
    void sendLoggedInEmail(String userName, String toEmail, String subject);
    // New method for contact form thank you
    void sendContactThankYouEmail(String name, String email, String subject);
}