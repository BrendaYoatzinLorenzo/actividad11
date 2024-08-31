import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { v4 as uuidv4} from 'uuid'

@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      id: uuidv4(),
      fecha: new Date('2024-05-20'),
      descripcion: 'Preparar la reunión semanal',
      realizado: false,
    },
    {
      id: uuidv4(),
      fecha: new Date('2024-05-21'),
      descripcion: 'Revisar los informes financieros',
      realizado: false,
    },
    {
      id: uuidv4(),
      fecha: new Date('2024-05-22'),
      descripcion: 'Actualizar el plan del proyecto',
      realizado: true,
    },
  ];

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuidv4(),
      ...createTaskDto
    }
    this.tasks.push(task)
    return task
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find(task => task.id === id)
    if(!task) {
      throw new NotFoundException(`Tarea con ID ${id} no fue encontrado`)
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Tarea con ID ${id} no fue encontrado`)
    }
    const updatedTask = { ...this.tasks[taskIndex], ...updateTaskDto };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  remove(id: string): void {
    const taskIndex = this.tasks.findIndex(task => task.id === id)
    if(taskIndex == -1) {
      throw new NotFoundException(`Tarea con ID ${id} no fue encontrado`)
    }
    this.tasks.splice(taskIndex, 1)
  }
}
