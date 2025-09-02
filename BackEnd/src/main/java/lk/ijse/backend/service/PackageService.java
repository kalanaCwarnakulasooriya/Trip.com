package lk.ijse.backend.service;

import lk.ijse.backend.dto.PackagesDTO;

import java.util.List;

public interface PackageService {
    List<PackagesDTO> getAllPackages();

    PackagesDTO getPackageById(Long id);

    PackagesDTO addPackage(PackagesDTO dto);

    PackagesDTO updatePackage(Long id, PackagesDTO dto);

    boolean deletePackage(Long id);
}
