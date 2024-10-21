import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Task } from './task.entity';
import { FindAllQueryDto } from './dtos/find-all-query.dto';
import { TaskDto } from './dtos/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiQuery({ name: 'search', description: 'Search query', required: false })
  @ApiQuery({ name: 'status', description: 'Task status', required: false })
  @ApiQuery({ name: 'priority', description: 'Task priority', required: false })
  @ApiQuery({ name: 'page', description: 'Page number', required: false })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false })
  async getAllTasks(
    @Query() query: FindAllQueryDto,
  ): Promise<{ data: Task[]; totalItems: number; currentPage: number }> {
    const { search, status, priority, page, limit } = query;
    return this.tasksService.findAll(
      search,
      status,
      priority,
      page,
      limit,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  async createTask(@Body() taskDto: TaskDto): Promise<Task> {
    return this.tasksService.create(taskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  async updateTask(
    @Param('id') id: string,
    @Body() taskDto: TaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, taskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.delete(id);
  }
}
