package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.TravelTipDTO;
import lk.ijse.backend.service.TravelTipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/travelTips")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TravelTipController {
    private final TravelTipService travelTipService;

    @PostMapping
    public ResponseEntity<APIResponse> createTravelTip(@RequestBody TravelTipDTO travelTipDTO) {
        TravelTipDTO savedTip = travelTipService.saveTravelTip(travelTipDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "TravelTip created successfully",
                savedTip
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateTravelTip(@PathVariable Long id, @RequestBody TravelTipDTO travelTipDTO) {
        TravelTipDTO updated = travelTipService.updateTravelTip(id, travelTipDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "TravelTip updated successfully",
                updated
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteTravelTip(@PathVariable Long id) {
        travelTipService.deleteTravelTip(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "TravelTip deleted successfully with id: " + id,
                null
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getTravelTipById(@PathVariable Long id) {
        TravelTipDTO tip = travelTipService.getTravelTipById(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "TravelTip fetched successfully",
                tip
        ));
    }

    @GetMapping
    public ResponseEntity<APIResponse> getAllTravelTips() {
        List<TravelTipDTO> tips = travelTipService.getAllTravelTips();
        return ResponseEntity.ok(new APIResponse(
                200,
                "TravelTips fetched successfully",
                tips
        ));
    }
}
