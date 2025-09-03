package lk.ijse.backend.service;

import lk.ijse.backend.dto.ContactDTO;

import java.util.List;

public interface ContactService {
    // For Admin
    List<ContactDTO> getAllContacts();
    ContactDTO getContactById(Long id);
    ContactDTO updateContact(Long id, ContactDTO contactDTO);
    boolean deleteContact(Long id);

    // For Users
    ContactDTO addContact(ContactDTO contactDTO);
}
