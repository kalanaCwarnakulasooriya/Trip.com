package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.GalleryDTO;
import lk.ijse.backend.entity.Gallery;
import lk.ijse.backend.repository.GalleryRepository;
import lk.ijse.backend.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {
    private final GalleryRepository galleryRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<GalleryDTO> getAllGalleries() {
        return galleryRepository.findAll()
                .stream()
                .map(gallery -> modelMapper.map(gallery, GalleryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public GalleryDTO getGalleryById(Long id) {
        return galleryRepository.findById(id)
                .map(gallery -> modelMapper.map(gallery, GalleryDTO.class))
                .orElse(null);
    }

    @Override
    public GalleryDTO addGallery(GalleryDTO galleryDTO) {
        Gallery gallery = modelMapper.map(galleryDTO, Gallery.class);
        Gallery saved = galleryRepository.save(gallery);
        return modelMapper.map(saved, GalleryDTO.class);
    }

    @Override
    public GalleryDTO updateGallery(Long id, GalleryDTO galleryDTO) {
        Optional<Gallery> optionalGallery = galleryRepository.findById(id);

        if (optionalGallery.isPresent()) {
            Gallery gallery = optionalGallery.get();
            gallery.setImageUrl(galleryDTO.getImageUrl());

            Gallery updated = galleryRepository.save(gallery);
            return modelMapper.map(updated, GalleryDTO.class);
        }

        return null;
    }

    @Override
    public boolean deleteGallery(Long id) {
        if (galleryRepository.existsById(id)) {
            galleryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
