package com.beltrandes.crudtobd.dtos;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record BillDTO(
    @JsonProperty("_id") Long id,
    @NotBlank @NotNull @Length(min = 5, max = 100) String description,
    @NotNull @DecimalMin(value = "0.01") Double amount,
    @NotNull @Length(max = 50) String dueDate,
    @NotBlank @NotNull @Length(max = 30) String category,
    @NotBlank @NotNull @Length(max = 20) @Pattern(regexp = "Pending|Paid|Late") String status
) {
    
}
