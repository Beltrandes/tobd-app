package com.beltrandes.crudtobd.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.beltrandes.crudtobd.dtos.BillDTO;
import com.beltrandes.crudtobd.service.BillService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/bills")
public class BillController {
    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping
    public @ResponseBody List<BillDTO> list() {
        return billService.list();
    }

    @GetMapping("/{id}")
    public BillDTO findById(@PathVariable @NotNull @Positive Long id) {
        return billService.findById(id);
    }


    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public BillDTO create(@RequestBody @Valid BillDTO bill) {
        return billService.create(bill);
    }

    @PutMapping("/{id}")
    public BillDTO update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid @NotNull BillDTO bill) {
        return billService.update(id, bill);
    }

    @PatchMapping("/{id}/status")
    public BillDTO updateStatus(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid @NotNull String newStatus) {
        return billService.updateStatus(id, newStatus);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        billService.delete(id);
    }
}
