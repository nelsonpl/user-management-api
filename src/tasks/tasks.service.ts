import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.entity';
import { TaskDto } from './dtos/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findAll(
    search?: string,
    status?: string,
    priority?: string,
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

  async create(taskDto: TaskDto): Promise<Task> {
    const createdTask = this.taskModel.create(taskDto);
    return createdTask;
  }

  async update(id: string, taskDto: TaskDto): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, taskDto, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return updatedTask;
  }

  async delete(id: string): Promise<{ message: string }> {
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return { message: `Task with ID "${id}" has been deleted` };
  }

  async complete(id: string): Promise<{ message: string }> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, status: 'pending' },
      { status: 'completed' },
      { new: true },
    );
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return { message: `Task with ID "${id}" has been completed` };
  }

  async archive(id: string): Promise<{ message: string }> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, archived: false },
      { archived: true },
      { new: true },
    );
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return { message: `Task with ID "${id}" has been archived` };
  }
}
