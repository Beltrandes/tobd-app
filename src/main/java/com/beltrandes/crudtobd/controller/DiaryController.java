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

import com.beltrandes.crudtobd.dtos.DiaryDTO;
import com.beltrandes.crudtobd.service.DiaryService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/diary")
public class DiaryController {
    private DiaryService diaryService;

    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @GetMapping
    public @ResponseBody List<DiaryDTO> list() {
        return diaryService.list();
    }

    @GetMapping("/{id}")
    public DiaryDTO findById(@PathVariable @NotNull @Positive Long id) {
        return diaryService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DiaryDTO create(@RequestBody @Valid DiaryDTO diary) {
        return diaryService.create(diary);
    }

    @PutMapping("/{id}")
    public DiaryDTO update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid DiaryDTO diary) {
        return diaryService.update(id, diary);
    }

    @PatchMapping("/{id}/status")
    public DiaryDTO updateStatus(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid @NotNull String newStatus) {
        return diaryService.updateStatus(id, newStatus);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        diaryService.delete(id);
    }
}
