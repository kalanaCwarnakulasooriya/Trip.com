package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.PaymentDTO;
import lk.ijse.backend.entity.Payment;
import lk.ijse.backend.repository.PaymentRepository;
import lk.ijse.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;

    @Override
    public PaymentDTO savePayment(PaymentDTO paymentDTO) {
        Payment payment = Payment.builder()
                .cardNumber(paymentDTO.getCardNumber())
                .cardholderName(paymentDTO.getCardholderName())
                .expiryDate(paymentDTO.getExpiryDate())
                .cvv(paymentDTO.getCvv())
                .build();

        Payment saved = paymentRepository.save(payment);
        return mapToDTO(saved);
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentDTO getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .map(this::mapToDTO)
                .orElse(null);
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    // ===== Helper Mapper Methods =====
    private PaymentDTO mapToDTO(Payment payment) {
        return new PaymentDTO(
                payment.getCardNumber(),
                payment.getCardholderName(),
                payment.getExpiryDate(),
                payment.getCvv()
        );
    }
}
