package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.FeedBackDTO;
import lk.ijse.backend.entity.FeedBack;
import lk.ijse.backend.repository.FeedBackRepository;
import lk.ijse.backend.service.FeedBackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedBackServiceImpl implements FeedBackService {
    private final FeedBackRepository feedBackRepository;

    @Override
    public FeedBackDTO addFeedBack(FeedBackDTO feedBackDTO) {
        FeedBack feedBack = FeedBack.builder()
                .name(feedBackDTO.getName())
                .trip(feedBackDTO.getTrip())
                .message(feedBackDTO.getMessage())
                .build();

        feedBack = feedBackRepository.save(feedBack);
        feedBackDTO.setId(feedBack.getId());
        return feedBackDTO;
    }

    @Override
    public List<FeedBackDTO> getAllFeedBacks() {
        return feedBackRepository.findAll()
                .stream()
                .map(fb -> new FeedBackDTO(fb.getId(), fb.getName(), fb.getTrip(), fb.getMessage()))
                .collect(Collectors.toList());
    }

    @Override
    public FeedBackDTO getFeedBackById(Long id) {
        return feedBackRepository.findById(id)
                .map(fb -> new FeedBackDTO(fb.getId(), fb.getName(), fb.getTrip(), fb.getMessage()))
                .orElse(null);
    }

    @Override
    public FeedBackDTO updateFeedBack(Long id, FeedBackDTO feedBackDTO) {
        return feedBackRepository.findById(id).map(fb -> {
            fb.setName(feedBackDTO.getName());
            fb.setTrip(feedBackDTO.getTrip());
            fb.setMessage(feedBackDTO.getMessage());
            feedBackRepository.save(fb);
            return new FeedBackDTO(fb.getId(), fb.getName(), fb.getTrip(), fb.getMessage());
        }).orElse(null);
    }

    @Override
    public boolean deleteFeedBack(Long id) {
        if (feedBackRepository.existsById(id)) {
            feedBackRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
