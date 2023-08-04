package com.beltrandes.crudtobd.dtos;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record TaskDTO(
    @JsonProperty("_id") Long id,
    @NotBlank @NotNull @Length(min = 10, max = 150) String description,
    @NotNull @Length(max = 20) @Pattern(regexp = "Home|Work|Studies|Health") String category
) {
    
}
