package lk.ijse.backend.service;

import lk.ijse.backend.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {
    PaymentDTO savePayment(PaymentDTO paymentDTO);
    List<PaymentDTO> getAllPayments();
    PaymentDTO getPaymentById(Long id);
    void deletePayment(Long id);
}
