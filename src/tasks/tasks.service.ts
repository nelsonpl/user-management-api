import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/entities/task.entity';
import { CreateTaskDto } from './dtos/createTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findAll(
    search?: string,
    status?: string,
    priority?: string,
    dueDateStart?: Date,
    dueDateEnd?: Date,
    page = 1,
    limit = 10,
  ): Promise<{ data: Task[]; totalItems: number; currentPage: number }> {
    const filters: any = {};

    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filters.status = status;
    }

    if (priority) {
      filters.priority = priority;
    }

    if (dueDateStart || dueDateEnd) {
      filters.dueDate = {};
      if (dueDateStart) filters.dueDate.$gte = dueDateStart;
      if (dueDateEnd) filters.dueDate.$lte = dueDateEnd;
    }

    const skip = (page - 1) * limit;
    const tasks = await this.taskModel
      .find(filters)
      .skip(skip)
      .limit(limit)
      .exec();
    const totalItems = await this.taskModel.countDocuments(filters);

    return {
      data: tasks,
      totalItems,
      currentPage: page,
    };
  }

  async findOneById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return updatedTask;
  }
}
