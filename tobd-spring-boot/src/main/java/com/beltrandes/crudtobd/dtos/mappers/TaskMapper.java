package com.beltrandes.crudtobd.dtos.mappers;

import org.springframework.stereotype.Component;

import com.beltrandes.crudtobd.dtos.TaskDTO;
import com.beltrandes.crudtobd.models.Task;

@Component
public class TaskMapper {
    public TaskDTO toDTO(Task task) {
        if (task == null) {
            return null;
        }

        return new TaskDTO(task.getId(), task.getDescription(), task.getCategory());
    }

    public Task toEntity(TaskDTO taskDTO) {
        if (taskDTO == null) {
            return null;
        }

        Task task = new Task();
        if (taskDTO.id() != null) {
            task.setId(taskDTO.id());
        }
        task.setDescription(taskDTO.description());
        task.setCategory(taskDTO.category());
        task.setStatus("Pendent");
        return task;
    }
}
