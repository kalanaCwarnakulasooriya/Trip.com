package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.ContactDTO;
import lk.ijse.backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    // ===== Users add a contact =====
    @PostMapping
    public ResponseEntity<APIResponse> addContact(@RequestBody ContactDTO contactDTO) {
        ContactDTO savedContact = contactService.addContact(contactDTO);
        return ResponseEntity.ok(new APIResponse(
                200,
                "Contact submitted successfully",
                savedContact
        ));
    }

    // ===== Admin view all contacts =====
    @GetMapping
    public ResponseEntity<APIResponse> getAllContacts() {
        List<ContactDTO> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(new APIResponse(
                200,
                "Contacts retrieved successfully",
                contacts
        ));
    }

}
