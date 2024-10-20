import { Controller, Get, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('dueDateStart') dueDateStart?: string,
    @Query('dueDateEnd') dueDateEnd?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: Task[]; totalItems: number; currentPage: number }> {
    const dueStartDate = dueDateStart ? new Date(dueDateStart) : undefined;
    const dueEndDate = dueDateEnd ? new Date(dueDateEnd) : undefined;

    return this.tasksService.findAll(
      search,
      status,
      priority,
      dueStartDate,
      dueEndDate,
      Number(page),
      Number(limit),
    );
  }
}
