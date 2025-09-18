package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.RentalProcessStepDTO;
import lk.ijse.backend.service.RentalProcessStepService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentalProcessSteps")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class RentalProcessStepController {
    private final RentalProcessStepService service;

    @GetMapping
    public ResponseEntity<APIResponse> getAllSteps() {
        List<RentalProcessStepDTO> steps = service.getAllSteps();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Rental Process Steps Fetched Successfully",
                steps
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getStepById(@PathVariable Long id) {
        RentalProcessStepDTO step = service.getStepById(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Rental Process Step Fetched Successfully",
                step
        ));
    }

    @PostMapping
    public ResponseEntity<APIResponse> createStep(@RequestBody RentalProcessStepDTO dto) {
        RentalProcessStepDTO saved = service.saveStep(dto);
        return new ResponseEntity<>(new APIResponse(
                201,
                "Rental Process Step Created Successfully",
                saved
        ), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateStep(@PathVariable Long id, @RequestBody RentalProcessStepDTO dto) {
        RentalProcessStepDTO updated = service.updateStep(id, dto);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Rental Process Step Updated Successfully",
                updated
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteStep(@PathVariable Long id) {
        service.deleteStep(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Rental Process Step Deleted Successfully",
                null
        ));
    }
}
