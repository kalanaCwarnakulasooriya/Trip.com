package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.GuideDTO;
import lk.ijse.backend.service.GuideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GuideController {
    private final GuideService guideService;

    // Create Guide
    @PostMapping
    public ResponseEntity<APIResponse> createGuide(@RequestBody GuideDTO guideDTO) {
        GuideDTO saved = guideService.saveGuide(guideDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Guide created successfully",
                saved
        ));
    }

    // Update Guide
    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateGuide(@PathVariable Long id, @RequestBody GuideDTO guideDTO) {
        GuideDTO updated = guideService.updateGuide(id, guideDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Guide updated successfully",
                updated
        ));
    }

    // Delete Guide
    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteGuide(@PathVariable Long id) {
        boolean deleted = guideService.deleteGuide(id);
        if (deleted) {
            return ResponseEntity.ok(new APIResponse(
                    200,
                    "Guide deleted successfully",
                    null
            ));
        } else {
            return ResponseEntity.status(404).body(new APIResponse(
                    404,
                    "Guide not found with id: " + id,
                    null
            ));
        }
    }

    // Get Guide by ID
    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getGuideById(@PathVariable Long id) {
        GuideDTO guide = guideService.getGuideById(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Guide retrieved successfully",
                guide
        ));
    }

    // Get All Guides
    @GetMapping
    public ResponseEntity<APIResponse> getAllGuides() {
        List<GuideDTO> guides = guideService.getAllGuides();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Guides retrieved successfully",
                guides
        ));
    }
}
