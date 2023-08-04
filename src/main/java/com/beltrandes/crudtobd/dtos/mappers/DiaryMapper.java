package com.beltrandes.crudtobd.dtos.mappers;

import org.springframework.stereotype.Component;

import com.beltrandes.crudtobd.dtos.DiaryDTO;
import com.beltrandes.crudtobd.models.Diary;

@Component
public class DiaryMapper {
    public DiaryDTO toDTO(Diary diary) {
        if (diary == null) {
            return null;
        }

        return new DiaryDTO(diary.getId(), diary.getDescription(), diary.getDate(), diary.getText(), diary.getStatus());
    }

    public Diary toEntity(DiaryDTO diaryDTO) {
        if (diaryDTO == null) {
            return null;
        }

        Diary diary = new Diary();
        if (diaryDTO.id() != null) {
            diary.setId(diaryDTO.id());
        }
        diary.setDescription(diaryDTO.description());
        diary.setDate(diaryDTO.date());
        diary.setText(diaryDTO.text());
        diary.setStatus(diaryDTO.status());
        return diary;
    }
}
