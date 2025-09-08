package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.PackageBookingDTO;
import lk.ijse.backend.entity.PackageBooking;
import lk.ijse.backend.repository.PackageBookingRepository;
import lk.ijse.backend.service.PackageBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PackageBookingServiceImpl implements PackageBookingService {
    private final PackageBookingRepository repository;

    @Override
    public PackageBookingDTO saveBooking(PackageBookingDTO dto) {
        PackageBooking booking = new PackageBooking();
        BeanUtils.copyProperties(dto, booking);
        PackageBooking saved = repository.save(booking);

        PackageBookingDTO response = new PackageBookingDTO();
        BeanUtils.copyProperties(saved, response);
        return response;
    }

    @Override
    public List<PackageBookingDTO> getAllBookings() {
        return repository.findAll()
                .stream()
                .map(entity -> {
                    PackageBookingDTO dto = new PackageBookingDTO();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public PackageBookingDTO getBookingById(Long id) {
        return repository.findById(id)
                .map(entity -> {
                    PackageBookingDTO dto = new PackageBookingDTO();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .orElse(null);
    }

    @Override
    public boolean deleteBooking(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
