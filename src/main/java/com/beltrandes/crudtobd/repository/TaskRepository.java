package com.beltrandes.crudtobd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beltrandes.crudtobd.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
}
