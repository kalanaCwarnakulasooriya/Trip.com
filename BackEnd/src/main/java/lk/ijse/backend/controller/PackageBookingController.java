package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.PackageBookingDTO;
import lk.ijse.backend.service.PackageBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packageBooking")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PackageBookingController {
    private final PackageBookingService packageBookingService;

    // Save booking
    @PostMapping
    public ResponseEntity<APIResponse> saveBooking(@RequestBody PackageBookingDTO dto) {
        PackageBookingDTO saved = packageBookingService.saveBooking(dto);
        return ResponseEntity.ok(new APIResponse(
                201,
                "Booking saved successfully",
                saved
        ));
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<APIResponse> getAllBookings() {
        List<PackageBookingDTO> list = packageBookingService.getAllBookings();
        return ResponseEntity.ok(new APIResponse(
                200,
                "All bookings retrieved",
                list
        ));
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getBookingById(@PathVariable Long id) {
        PackageBookingDTO booking = packageBookingService.getBookingById(id);
        if (booking != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Booking retrieved",
                    booking
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Booking not found",
                null
        ));
    }

    // Delete booking
    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteBooking(@PathVariable Long id) {
        boolean deleted = packageBookingService.deleteBooking(id);
        if (deleted) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Booking deleted successfully",
                    null
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Booking not found",
                null
        ));
    }
}
