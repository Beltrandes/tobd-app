package com.beltrandes.crudtobd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beltrandes.crudtobd.models.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    
}
