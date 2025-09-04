package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.FeedBackDTO;
import lk.ijse.backend.service.FeedBackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class FeedBackController {
    private final FeedBackService feedBackService;

    @PostMapping
    public ResponseEntity<APIResponse> addFeedBack(@RequestBody FeedBackDTO feedBackDTO) {
        FeedBackDTO saved = feedBackService.addFeedBack(feedBackDTO);
        return ResponseEntity.ok(new APIResponse(
                201,
                "Feedback added successfully",
                saved
        ));
    }

    @GetMapping
    public ResponseEntity<APIResponse> getAllFeedBacks() {
        List<FeedBackDTO> list = feedBackService.getAllFeedBacks();
        return ResponseEntity.ok(new APIResponse(
                200,
                "All feedbacks retrieved",
                list
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getFeedBackById(@PathVariable Long id) {
        FeedBackDTO feedback = feedBackService.getFeedBackById(id);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Feedback retrieved",
                feedback
        ));
    }
}
