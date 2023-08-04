package com.beltrandes.crudtobd.models;

import java.util.Date;

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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE Diary SET activity = 'Inactive' WHERE id = ?")
@Where(clause = "activity = 'Active'")
public class Diary {
    
    @Id
    @JsonProperty("_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @NotNull
    @Length(min = 10, max = 50)
    @Column(length = 100, nullable = false)
    private String description;

    

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(nullable = false)
    private Date date;

    @NotBlank
    @NotNull
    @Length(min = 100, max = 1000)
    @Column(length = 1000, nullable = false)
    private String text;

    @NotBlank
    @NotNull
    @Length(max = 20)
    @Pattern(regexp = "Marked|Unmarked")
    @Column(length = 20, nullable = false)
    private String status = "Unmarked";

    @NotBlank
    @NotNull
    @Length(max = 10)
    @Pattern(regexp = "Active|Inactive")
    @Column(length = 20, nullable = false)
    private String activity = "Active";


}
