package lk.ijse.backend.service.impl;

import jakarta.mail.internet.MimeMessage;
import lk.ijse.backend.service.MailSendService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailSendServiceImpl implements MailSendService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    private String loginAlert(String userName) {
        return String.format("""
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
          }
          .container {
            max-width: 650px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
            animation: fadeIn 1s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .header {
            background: linear-gradient(90deg, #4f46e5, #3b82f6);
            color: #fff;
            text-align: center;
            padding: 30px 20px;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .content {
            padding: 35px 30px;
            color: #1e293b;
            line-height: 1.7;
          }
          .content p {
            margin-bottom: 18px;
            font-size: 16px;
          }
          .button {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(90deg, #f43f5e, #e11d48);
            color: #fff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(244,63,94,0.3);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(244,63,94,0.4);
          }
          .alert-box {
            padding: 20px;
            border-left: 5px solid #f43f5e;
            background-color: #ffe4e6;
            border-radius: 8px;
            margin: 25px 0;
          }
          .footer {
            padding: 25px;
            font-size: 13px;
            color: #64748b;
            text-align: center;
            background-color: #f1f5f9;
          }
          .footer a {
            color: #3b82f6;
            text-decoration: none;
          }
          @media only screen and (max-width: 600px) {
            .content { padding: 25px 20px; }
            .header { font-size: 24px; padding: 25px 15px; }
            .button { padding: 12px 24px; font-size: 15px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Trip.com Login Alert</div>
          <div class="content">
            <p>Hello <strong>%s</strong>,</p>
            <div class="alert-box">
              <p>We noticed a new login to your Trip.com account.</p>
              <p>If this was you, everything is safe. No action is needed.</p>
            </div>
            <p>If you did NOT login, please secure your account immediately:</p>
            <a href="https://www.trip.com/account/security" class="button">Secure Your Account</a>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
            <p>Thank you for choosing Trip.com. We’re excited to help you explore the world!</p>
          </div>
          <div class="footer">
            &copy; %s Trip.com | All rights reserved | 
            <a href="https://www.trip.com/privacy">Privacy Policy</a>
          </div>
        </div>
      </body>
    </html>
    """, userName, java.time.Year.now());
    }

    private String registeredAlert(String userName) {
        String dateTime = java.time.LocalDateTime.now()
                .format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        return String.format("""
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f6f8;
            margin: 0; padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background-color: #2a9df4;
            color: #fff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 25px;
            color: #333333;
          }
          .content p {
            font-size: 16px;
            line-height: 1.5;
          }
          .footer {
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #777777;
            background-color: #f4f6f8;
          }
          .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ff6b6b;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Welcome to Trip.com!</div>
          <div class="content">
            <p>Hi <strong>%s</strong>,</p>
            <p>Thank you for registering with Trip.com. Your account has been successfully created.</p>
            <p><strong>Registration Date & Time:</strong> %s</p>
            <p>Start exploring amazing trips and deals with us!</p>
            <a href="https://www.trip.com" class="button">Visit Trip.com</a>
          </div>
          <div class="footer">
            &copy; %s Trip.com | All rights reserved
          </div>
        </div>
      </body>
    </html>
    """, userName, dateTime, java.time.Year.now());
    }


    public void sendLoggedInEmail(String userName, String toEmail, String subject) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(loginAlert(userName), true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public void sendRegisteredEmail(String name, String email, String subject) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(registeredAlert(name), true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
