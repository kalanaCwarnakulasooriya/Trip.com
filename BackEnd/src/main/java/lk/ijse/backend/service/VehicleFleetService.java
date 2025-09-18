package lk.ijse.backend.service;

import lk.ijse.backend.dto.VehicleFleetDTO;

import java.util.List;

public interface VehicleFleetService {
    VehicleFleetDTO saveFleet(VehicleFleetDTO dto);
    VehicleFleetDTO updateFleet(Long id, VehicleFleetDTO dto);
    void deleteFleet(Long id);
    VehicleFleetDTO getFleetById(Long id);
    List<VehicleFleetDTO> getAllFleets();
}
