package lk.ijse.backend.service;

import lk.ijse.backend.dto.AllDestinationsDTO;

import java.util.List;

public interface AllDestinationsService {
    List<AllDestinationsDTO> getAllDestinations();
    AllDestinationsDTO getDestinationById(Long id);
    AllDestinationsDTO addDestination(AllDestinationsDTO dto);
    AllDestinationsDTO updateDestination(Long id, AllDestinationsDTO dto);
    boolean deleteDestination(Long id);
}
