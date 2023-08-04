package com.beltrandes.crudtobd.dtos.mappers;

import org.springframework.stereotype.Component;

import com.beltrandes.crudtobd.dtos.BillDTO;
import com.beltrandes.crudtobd.models.Bill;

@Component
public class BillMapper {
    public BillDTO toDTO(Bill bill) {
        if (bill == null) {
            return null;
        }

        return new BillDTO(bill.getId(), bill.getDescription(), bill.getAmount(), bill.getDueDate(), bill.getCategory(), bill.getStatus());
    }

    public Bill toEntity(BillDTO billDTO) {
        if (billDTO == null) {
            return null;
        }

        Bill bill = new Bill();
        if (billDTO.id() != null) {
            bill.setId(billDTO.id());
        }
        bill.setDescription(billDTO.description());
        bill.setAmount(billDTO.amount());
        bill.setDueDate(billDTO.dueDate());
        bill.setCategory(billDTO.category());
        bill.setStatus(billDTO.status());
        return bill;
    }
}
