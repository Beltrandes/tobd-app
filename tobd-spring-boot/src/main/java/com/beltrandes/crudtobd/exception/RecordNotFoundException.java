package com.beltrandes.crudtobd.exception;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class RecordNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RecordNotFoundException(@NotNull @Positive Long id) {
        super("Record not found for id: " + id);
    }
}
