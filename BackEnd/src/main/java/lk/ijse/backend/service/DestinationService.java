package lk.ijse.backend.service;

import lk.ijse.backend.dto.DestinationDTO;

import java.util.List;

public interface DestinationService {
    List<DestinationDTO> getAllDestinations();

    DestinationDTO getDestinationById(Long id);

    List<DestinationDTO> getDestinationsByPackage(Long packageId);

    DestinationDTO addDestination(DestinationDTO destinationDTO);

    DestinationDTO updateDestination(Long id, DestinationDTO destinationDTO);

    boolean deleteDestination(Long id);
}
