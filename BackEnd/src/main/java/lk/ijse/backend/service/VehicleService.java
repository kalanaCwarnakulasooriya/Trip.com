package lk.ijse.backend.service;

import lk.ijse.backend.dto.VehicleDTO;

import java.util.List;

public interface VehicleService {
    VehicleDTO saveVehicle(VehicleDTO vehicleDTO);
    VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO);
    void deleteVehicle(Long id);
    VehicleDTO getVehicleById(Long id);
    List<VehicleDTO> getAllVehicles();
}
