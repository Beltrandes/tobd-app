package com.beltrandes.crudtobd.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.beltrandes.crudtobd.dtos.TaskDTO;
import com.beltrandes.crudtobd.service.TaskService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public @ResponseBody List<TaskDTO> list() {
        return taskService.list();
    }

    @GetMapping("/{id}")
    public TaskDTO findById(@PathVariable @NotNull @Positive Long id) {
            return taskService.findById(id);
        }

    

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public TaskDTO create(@RequestBody @Valid TaskDTO task) {
        return taskService.create(task);
    }

    @PutMapping("/{id}")
    public TaskDTO update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid TaskDTO task) {
        return taskService.update(id, task);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        taskService.delete(id);
    }
    


}
