package com.beltrandes.crudtobd.dtos;

import java.util.Date;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DiaryDTO(
    @JsonProperty("_id") Long id,
    @NotBlank @NotNull @Length(min = 5, max = 100) String description,
    @DateTimeFormat(pattern = "dd/MM/yyyy") Date date,
    @NotBlank @NotNull @Length(min = 100, max = 1000) String text,
    @NotBlank @NotNull @Length(max = 20) @Pattern(regexp = "Marked|Unmarked") String status
) {
    
}
