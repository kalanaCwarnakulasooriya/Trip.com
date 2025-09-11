package lk.ijse.backend.service;

import lk.ijse.backend.dto.TravelTipDTO;

import java.util.List;

public interface TravelTipService {
    TravelTipDTO saveTravelTip(TravelTipDTO travelTipDTO);
    TravelTipDTO updateTravelTip(Long id, TravelTipDTO travelTipDTO);
    void deleteTravelTip(Long id);
    TravelTipDTO getTravelTipById(Long id);
    List<TravelTipDTO> getAllTravelTips();
}
