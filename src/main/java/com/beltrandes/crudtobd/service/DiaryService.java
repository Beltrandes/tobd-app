package com.beltrandes.crudtobd.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.beltrandes.crudtobd.dtos.DiaryDTO;
import com.beltrandes.crudtobd.dtos.mappers.DiaryMapper;
import com.beltrandes.crudtobd.exception.RecordNotFoundException;
import com.beltrandes.crudtobd.repository.DiaryRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class DiaryService {
    private DiaryRepository diaryRepository;
    private DiaryMapper diaryMapper;

    public DiaryService(DiaryRepository diaryRepository, DiaryMapper diaryMapper) {
        this.diaryRepository = diaryRepository;
        this.diaryMapper = diaryMapper;
    }

    public List<DiaryDTO> list() {
        return diaryRepository.findAll()
            .stream()
            .map(diaryMapper::toDTO)
            .toList();
    }

    public DiaryDTO findById(@PathVariable @NotNull @Positive Long id) {
        return diaryRepository.findById(id).map(diaryMapper::toDTO)
            .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public DiaryDTO create(@Valid @NotNull DiaryDTO diary) {
        return diaryMapper.toDTO(diaryRepository.save(diaryMapper.toEntity(diary)));
    }

    public DiaryDTO update(@NotNull @Positive Long id, @Valid @NotNull DiaryDTO diary) {
        return diaryRepository.findById(id)
            .map(recordFound -> {
                recordFound.setDescription(diary.description());
                recordFound.setDate(diary.date());
                recordFound.setText(diary.text());
                return diaryMapper.toDTO(diaryRepository.save(recordFound));
            }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public DiaryDTO updateStatus(@PathVariable @Positive Long id, @RequestBody String newStatus) {
        return diaryRepository.findById(id)
        .map(recordFound -> {
            recordFound.setStatus(newStatus);
            return diaryMapper.toDTO(diaryRepository.save(recordFound));
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @NotNull @Positive Long id) {
        diaryRepository.delete(diaryRepository.findById(id)
            .orElseThrow(() -> new RecordNotFoundException(id)));
    }



}
