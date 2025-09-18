package lk.ijse.backend.service;

import lk.ijse.backend.dto.VehicleFleetDTO;

import java.util.List;

public interface VehicleFleetService {
    List<VehicleFleetDTO> getAllFleets();
    VehicleFleetDTO getFleetById(Long id);
    VehicleFleetDTO saveFleet(VehicleFleetDTO dto);
    VehicleFleetDTO updateFleet(Long id, VehicleFleetDTO dto);
    void deleteFleet(Long id);
}
