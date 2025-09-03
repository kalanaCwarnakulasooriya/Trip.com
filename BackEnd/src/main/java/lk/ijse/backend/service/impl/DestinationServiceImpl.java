package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.DestinationDTO;
import lk.ijse.backend.entity.Destination;
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
    private final PackageRepository PackageRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<DestinationDTO> getAllDestinations() {
        return destinationRepository.findAll()
                .stream()
                .map(dest -> modelMapper.map(dest, DestinationDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public DestinationDTO getDestinationById(Long id) {
        return destinationRepository.findById(id)
                .map(dest -> modelMapper.map(dest, DestinationDTO.class))
                .orElse(null);
    }

    @Override
    public List<DestinationDTO> getDestinationsByPackage(Long packageId) {
        return destinationRepository.findByTravelPackageId(packageId)
                .stream()
                .map(dest -> modelMapper.map(dest, DestinationDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public DestinationDTO addDestination(DestinationDTO destinationDTO) {
        Destination destination = modelMapper.map(destinationDTO, Destination.class);

        if (destinationDTO.getPackageId() != null) {
            PackageRepository.findById(destinationDTO.getPackageId())
                    .ifPresent(destination::setPackages);
        }

        Destination saved = destinationRepository.save(destination);
        return modelMapper.map(saved, DestinationDTO.class);
    }

    @Override
    public DestinationDTO updateDestination(Long id, DestinationDTO destinationDTO) {
        Optional<Destination> optionalDestination = destinationRepository.findById(id);

        if (optionalDestination.isPresent()) {
            Destination destination = optionalDestination.get();
            destination.setTitle(destinationDTO.getTitle());
            destination.setLocation(destinationDTO.getLocation());
            destination.setImageUrl(destinationDTO.getImageUrl());
            destination.setPrice(destinationDTO.getPrice());
            destination.setCurrency(destinationDTO.getCurrency());
            destination.setDuration(destinationDTO.getDuration());
            destination.setRating(destinationDTO.getRating());
            destination.setReviews(destinationDTO.getReviews());

            if (destinationDTO.getPackageId() != null) {
                PackageRepository.findById(destinationDTO.getPackageId())
                        .ifPresent(destination::setPackages);
            }

            Destination updated = destinationRepository.save(destination);
            return modelMapper.map(updated, DestinationDTO.class);
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
}
