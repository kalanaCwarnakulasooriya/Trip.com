package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.DestinationDTO;
import lk.ijse.backend.entity.Destination;
import lk.ijse.backend.entity.enums.Currency;
import lk.ijse.backend.repository.DestinationRepository;
import lk.ijse.backend.repository.PackageRepository;
import lk.ijse.backend.service.DestinationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DestinationServiceImpl implements DestinationService {

    private final DestinationRepository destinationRepository;
    private final PackageRepository packageRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<DestinationDTO> getAllDestinations() {
        return destinationRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DestinationDTO getDestinationById(Long id) {
        return destinationRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<DestinationDTO> getDestinationsByPackage(Long packageId) {
        return destinationRepository.findByTravelPackageId(packageId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DestinationDTO addDestination(DestinationDTO dto) {
        Destination destination = convertToEntity(dto);

        Destination saved = destinationRepository.save(destination);
        return convertToDTO(saved);
    }

    @Override
    public DestinationDTO updateDestination(Long id, DestinationDTO dto) {
        Optional<Destination> optionalDestination = destinationRepository.findById(id);
        if (optionalDestination.isPresent()) {
            Destination destination = optionalDestination.get();
            destination.setTitle(dto.getTitle());
            destination.setLocation(dto.getLocation());
            destination.setImageUrl(dto.getImageUrl());
            destination.setPrice(dto.getPrice());

            if (dto.getCurrency() != null) {
                destination.setCurrency(Currency.valueOf(dto.getCurrency()));
            }

            destination.setRating(dto.getRating());
            destination.setReviews(dto.getReviews());
            destination.setDuration(dto.getDuration());

            Destination updated = destinationRepository.save(destination);
            return convertToDTO(updated);
        }
        return null;
    }

    @Override
    public boolean deleteDestination(Long id) {
        if (destinationRepository.existsById(id)) {
            destinationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // --- Helper Methods ---
    private DestinationDTO convertToDTO(Destination dest) {
        DestinationDTO dto = modelMapper.map(dest, DestinationDTO.class);
        dto.setCurrency(dest.getCurrency() != null ? dest.getCurrency().name() : null);
        return dto;
    }

    private Destination convertToEntity(DestinationDTO dto) {
        Destination dest = modelMapper.map(dto, Destination.class);
        if (dto.getCurrency() != null) {
            dest.setCurrency(Currency.valueOf(dto.getCurrency()));
        }
        return dest;
    }
}
