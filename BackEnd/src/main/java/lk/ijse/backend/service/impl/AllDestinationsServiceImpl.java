package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.AllDestinationsDTO;
import lk.ijse.backend.entity.AllDestinations;
import lk.ijse.backend.entity.enums.Currency;
import lk.ijse.backend.entity.enums.PriceRange;
import lk.ijse.backend.repository.AllDestinationsRepository;
import lk.ijse.backend.service.AllDestinationsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AllDestinationsServiceImpl implements AllDestinationsService {
    private final AllDestinationsRepository allDestinationsRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<AllDestinationsDTO> getAllDestinations() {
        return allDestinationsRepository.findAll()
                .stream()
                .map(dest -> modelMapper.map(dest, AllDestinationsDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AllDestinationsDTO getDestinationById(Long id) {
        return allDestinationsRepository.findById(id)
                .map(dest -> modelMapper.map(dest, AllDestinationsDTO.class))
                .orElse(null);
    }

    @Override
    public AllDestinationsDTO addDestination(AllDestinationsDTO dto) {
        AllDestinations entity = modelMapper.map(dto, AllDestinations.class);
        if (dto.getCurrency() != null && !dto.getCurrency().isEmpty()) {
            entity.setCurrency(Currency.valueOf(dto.getCurrency().toUpperCase()));
        }
        if (dto.getPriceRange() != null && !dto.getPriceRange().isEmpty()) {
            entity.setPriceRange(PriceRange.valueOf(dto.getPriceRange().toUpperCase()));
        }
        AllDestinations saved = allDestinationsRepository.save(entity);
        return modelMapper.map(saved, AllDestinationsDTO.class);
    }

    @Override
    public AllDestinationsDTO updateDestination(Long id, AllDestinationsDTO dto) {
        Optional<AllDestinations> optionalDestination = allDestinationsRepository.findById(id);

        if (optionalDestination.isPresent()) {
            AllDestinations entity = optionalDestination.get();
            entity.setTitle(dto.getTitle());
            entity.setLocation(dto.getLocation());
            entity.setImageUrl(dto.getImageUrl());
            entity.setRating(dto.getRating());
            entity.setCategory(dto.getCategory());
            if (dto.getCurrency() != null && !dto.getCurrency().isEmpty()) {
                entity.setCurrency(Currency.valueOf(dto.getCurrency().toUpperCase()));
            }
            if (dto.getPriceRange() != null && !dto.getPriceRange().isEmpty()) {
                entity.setPriceRange(PriceRange.valueOf(dto.getPriceRange().toUpperCase()));
            }
            entity.setPrice(dto.getPrice());

            AllDestinations updated = allDestinationsRepository.save(entity);
            return modelMapper.map(updated, AllDestinationsDTO.class);
        }
        return null;
    }

    @Override
    public boolean deleteDestination(Long id) {
        if (allDestinationsRepository.existsById(id)) {
            allDestinationsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
