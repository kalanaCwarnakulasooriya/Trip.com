package lk.ijse.backend.service;

import lk.ijse.backend.dto.RentalProcessStepDTO;

import java.util.List;

public interface RentalProcessStepService {
    List<RentalProcessStepDTO> getAllSteps();
    RentalProcessStepDTO getStepById(Long id);
    RentalProcessStepDTO saveStep(RentalProcessStepDTO dto);
    RentalProcessStepDTO updateStep(Long id, RentalProcessStepDTO dto);
    void deleteStep(Long id);
}
