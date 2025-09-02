package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.PackagesDTO;
import lk.ijse.backend.entity.Packages;
import lk.ijse.backend.repository.PackageRepository;
import lk.ijse.backend.service.PackageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PackageServiceImpl implements PackageService {
    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PackagesDTO> getAllPackages() {
        return packageRepository.findAll()
                .stream()
                .map(packageEntity -> modelMapper.map(packageEntity, PackagesDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public PackagesDTO getPackageById(Long id) {
        Optional<Packages> optionalPackage = packageRepository.findById(id);
        return optionalPackage
                .map(packageEntity -> modelMapper.map(packageEntity, PackagesDTO.class))
                .orElse(null);
    }

    @Override
    public PackagesDTO addPackage(PackagesDTO dto) {
        Packages packages = modelMapper.map(dto, Packages.class);
        Packages saved = packageRepository.save(packages);
        return modelMapper.map(saved, PackagesDTO.class);
    }

    @Override
    public PackagesDTO updatePackage(Long id, PackagesDTO dto) {
        Optional<Packages> optionalPackage = packageRepository.findById(id);
        if (optionalPackage.isPresent()) {
            Packages packages = optionalPackage.get();
            // Update fields
            packages.setTitle(dto.getTitle());
            packages.setDescription(dto.getDescription());
            packages.setFeatures(dto.getFeatures());
            packages.setPrice(dto.getPrice());
            packages.setUnit(dto.getUnit());
            // Save updated entity
            Packages updated = packageRepository.save(packages);
            return modelMapper.map(updated, PackagesDTO.class);
        }
        return null;
    }

    @Override
    public boolean deletePackage(Long id) {
        if (packageRepository.existsById(id)) {
            packageRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
