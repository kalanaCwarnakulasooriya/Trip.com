package lk.ijse.backend.service.impl;

import lk.ijse.backend.dto.ContactDTO;
import lk.ijse.backend.entity.Contact;
import lk.ijse.backend.repository.ContactRepository;
import lk.ijse.backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final ModelMapper modelMapper;

    // ===== User: Submit contact =====
    @Override
    public ContactDTO addContact(ContactDTO contactDTO) {
        Contact contact = modelMapper.map(contactDTO, Contact.class);
        Contact saved = contactRepository.save(contact);
        return modelMapper.map(saved, ContactDTO.class);
    }

    // ===== Admin: View all =====
    @Override
    public List<ContactDTO> getAllContacts() {
        return contactRepository.findAll()
                .stream()
                .map(contact -> modelMapper.map(contact, ContactDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ContactDTO getContactById(Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        return contact.map(c -> modelMapper.map(c, ContactDTO.class)).orElse(null);
    }

    @Override
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        Optional<Contact> optionalContact = contactRepository.findById(id);
        if (optionalContact.isPresent()) {
            Contact contact = optionalContact.get();
            contact.setName(contactDTO.getName());
            contact.setEmail(contactDTO.getEmail());
            contact.setSubject(contactDTO.getSubject());
            contact.setMessage(contactDTO.getMessage());

            Contact updated = contactRepository.save(contact);
            return modelMapper.map(updated, ContactDTO.class);
        }
        return null;
    }

    @Override
    public boolean deleteContact(Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
            return true;
        }
        return false;
    }
}