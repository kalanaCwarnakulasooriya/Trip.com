package lk.ijse.backend.service;

import lk.ijse.backend.dto.GuideDTO;

import java.util.List;

public interface GuideService {
    GuideDTO saveGuide(GuideDTO guideDTO);
    GuideDTO updateGuide(Long id, GuideDTO guideDTO);
    boolean deleteGuide(Long id);
    GuideDTO getGuideById(Long id);
    List<GuideDTO> getAllGuides();
}
