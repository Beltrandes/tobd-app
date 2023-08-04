package com.beltrandes.crudtobd.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.beltrandes.crudtobd.dtos.TaskDTO;
import com.beltrandes.crudtobd.dtos.mappers.TaskMapper;
import com.beltrandes.crudtobd.exception.RecordNotFoundException;
import com.beltrandes.crudtobd.repository.TaskRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    public List<TaskDTO> list() {
        return taskRepository.findAll()
            .stream()
            .map(taskMapper::toDTO)
            .toList();
    }

    public TaskDTO findById(@PathVariable @NotNull @Positive Long id) {
        return taskRepository.findById(id).map(taskMapper::toDTO)
            .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public TaskDTO create(@Valid @NotNull TaskDTO task) {
        return taskMapper.toDTO(taskRepository.save(taskMapper.toEntity(task)));
    }

    

    public TaskDTO update(@NotNull @Positive Long id, @Valid @NotNull TaskDTO task) {
        return taskRepository.findById(id)
            .map(recordFound -> {
                recordFound.setDescription(task.description());
                recordFound.setCategory(task.category());
                return taskMapper.toDTO(taskRepository.save(recordFound));
            }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @NotNull @Positive Long id) {
        taskRepository.delete(taskRepository.findById(id)
            .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
