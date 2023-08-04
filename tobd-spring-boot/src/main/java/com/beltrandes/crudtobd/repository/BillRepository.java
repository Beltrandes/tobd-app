package com.beltrandes.crudtobd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beltrandes.crudtobd.models.Bill;

public interface BillRepository extends JpaRepository<Bill, Long> {
    
}
