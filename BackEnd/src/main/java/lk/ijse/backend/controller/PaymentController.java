package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.PaymentDTO;
import lk.ijse.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<APIResponse> createPayment(@RequestBody PaymentDTO paymentDTO) {
        PaymentDTO savedPayment = paymentService.savePayment(paymentDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Payment created successfully",
                savedPayment
        ));
    }

    @GetMapping
    public ResponseEntity<APIResponse> getAllPayments() {
        List<PaymentDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(new APIResponse(
                200,
                "All payments retrieved successfully",
                payments
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getPaymentById(@PathVariable Long id) {
        PaymentDTO paymentDTO = paymentService.getPaymentById(id);
        if (paymentDTO != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Payment retrieved successfully",
                    paymentDTO
            ));
        } else {
            return ResponseEntity.status(404).body(new APIResponse(
                    404,
                    "Payment not found",
                    null
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Payment deleted successfully",
                null
        ));
    }
}
