package lk.ijse.backend.service;

import lk.ijse.backend.dto.PackageBookingDTO;

import java.util.List;

public interface PackageBookingService {
    PackageBookingDTO saveBooking(PackageBookingDTO dto);
    List<PackageBookingDTO> getAllBookings();
    PackageBookingDTO getBookingById(Long id);
    boolean deleteBooking(Long id);
}
