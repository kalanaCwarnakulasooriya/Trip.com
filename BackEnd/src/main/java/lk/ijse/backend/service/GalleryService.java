package lk.ijse.backend.service;

import lk.ijse.backend.dto.GalleryDTO;

import java.util.List;

public interface GalleryService {
    List<GalleryDTO> getAllGalleries();
    GalleryDTO getGalleryById(Long id);
    GalleryDTO addGallery(GalleryDTO galleryDTO);
    GalleryDTO updateGallery(Long id, GalleryDTO galleryDTO);
    boolean deleteGallery(Long id);
}
