package lk.ijse.backend.service;

import lk.ijse.backend.dto.FeedBackDTO;

import java.util.List;

public interface FeedBackService {
    FeedBackDTO addFeedBack(FeedBackDTO feedBackDTO);
    List<FeedBackDTO> getAllFeedBacks();
    FeedBackDTO getFeedBackById(Long id);
    FeedBackDTO updateFeedBack(Long id, FeedBackDTO feedBackDTO);
    boolean deleteFeedBack(Long id);
}
