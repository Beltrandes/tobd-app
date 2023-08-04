package com.beltrandes.crudtobd.models;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE Task SET status = 'Done' WHERE id = ?")
@Where(clause = "status = 'Pendent'")
public class Task {
    
    @Id
    @JsonProperty("_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @NotNull
    @Length(min = 10 ,max = 150)
    @Column(length = 150, nullable = false)
    private String description;

    @NotBlank
    @NotNull
    @Length(max = 20)
    @Pattern(regexp = "Home|Work|Studies|Health")
    @Column(length = 20, nullable = false)
    private String category;


    @NotBlank
    @NotNull
    @Length(max = 10)
    @Column(length = 20, nullable = false)
    private String status = "Pendent";
}
