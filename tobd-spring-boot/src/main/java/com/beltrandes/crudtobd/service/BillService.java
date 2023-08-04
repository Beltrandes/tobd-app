package com.beltrandes.crudtobd.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.beltrandes.crudtobd.dtos.BillDTO;
import com.beltrandes.crudtobd.dtos.mappers.BillMapper;
import com.beltrandes.crudtobd.exception.RecordNotFoundException;
import com.beltrandes.crudtobd.repository.BillRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class BillService {
    private final BillRepository billRepository;
    private final BillMapper billMapper;

    public BillService(BillRepository billRepository, BillMapper billMapper) {
        this.billRepository = billRepository;
        this.billMapper = billMapper;
    }

    public List<BillDTO> list() {
        return billRepository.findAll()
            .stream()
            .map(billMapper::toDTO)
            .toList();
    }

    public BillDTO findById(@PathVariable @NotNull @Positive Long id) {
        return billRepository.findById(id).map(billMapper::toDTO)
            .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public BillDTO create(@Valid @NotNull BillDTO bill) {
        return billMapper.toDTO(billRepository.save(billMapper.toEntity(bill)));
    }

    public BillDTO update(@NotNull @Positive Long id, @Valid @NotNull BillDTO bill) {
        return billRepository.findById(id)
        .map(recordFound -> {
            recordFound.setDescription(bill.description());
            recordFound.setAmount(bill.amount());
            recordFound.setDueDate(bill.dueDate());
            recordFound.setCategory(bill.category());
            recordFound.setStatus(bill.status());
            return billMapper.toDTO(billRepository.save(recordFound));
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public BillDTO updateStatus(@PathVariable @Positive Long id, @RequestBody String newStatus) {
        return billRepository.findById(id)
        .map(recordFound -> {
            recordFound.setStatus(newStatus);
            return billMapper.toDTO(billRepository.save(recordFound));
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @NotNull @Positive Long id) {
        billRepository.delete(billRepository.findById(id)
            .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
