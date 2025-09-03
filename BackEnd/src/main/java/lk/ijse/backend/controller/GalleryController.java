package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.GalleryDTO;
import lk.ijse.backend.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/galleries")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping
    public ResponseEntity<APIResponse> getAllGalleries() {
        List<GalleryDTO> galleries = galleryService.getAllGalleries();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Galleries retrieved successfully",
                galleries
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getGalleryById(@PathVariable Long id) {
        GalleryDTO gallery = galleryService.getGalleryById(id);
        if (gallery != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Gallery retrieved successfully",
                    gallery
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Gallery not found",
                null
        ));
    }

    @PostMapping
    public ResponseEntity<APIResponse> addGallery(@RequestBody GalleryDTO galleryDTO) {
        GalleryDTO savedGallery = galleryService.addGallery(galleryDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Gallery added successfully",
                savedGallery
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateGallery(@PathVariable Long id, @RequestBody GalleryDTO galleryDTO) {
        GalleryDTO updatedGallery = galleryService.updateGallery(id, galleryDTO);
        if (updatedGallery != null) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Gallery updated successfully",
                    updatedGallery
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Gallery not found",
                null
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteGallery(@PathVariable Long id) {
        boolean deleted = galleryService.deleteGallery(id);
        if (deleted) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Gallery deleted successfully",
                    null
            ));
        }
        return ResponseEntity.status(404).body(new APIResponse(
                404,
                "Gallery not found",
                null
        ));
    }
}