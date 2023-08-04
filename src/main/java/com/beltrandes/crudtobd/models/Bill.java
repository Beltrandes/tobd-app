package com.beltrandes.crudtobd.models;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE Bill SET activity = 'Inactive' WHERE id = ?")
@Where(clause = "activity = 'Active'")
public class Bill {
    
    @Id
    @JsonProperty("_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @NotNull
    @Length(min = 5, max = 100)
    @Column(length = 100, nullable = false)
    private String description;

    @NotNull
    @DecimalMin(value = "0.01")
    @Column(length = 20, nullable = false)
    private Double amount;

    @NotNull
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private String dueDate;

    @NotBlank
    @NotNull
    @Length(max = 30)
    @Column(length = 30, nullable = false)
    private String category;

    @NotBlank
    @NotNull
    @Length(max = 20)
    @Pattern(regexp = "Pending|Paid|Late")
    @Column(length = 20, nullable = false)
    private String status = "Pending";

    @NotBlank
    @NotNull
    @Length(max = 10)
    @Pattern(regexp = "Active|Inactive")
    @Column(length = 20, nullable = false)
    private String activity = "Active";

}
