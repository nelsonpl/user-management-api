import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.entity';

const mockTaskModel = {
  create: jest.fn(),
  find: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  countDocuments: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;
  let taskModel: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskModel = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const taskDto = { title: 'Test Task' };
      const savedTask = { id: '1', title: 'Test Task' };
      mockTaskModel.create.mockReturnValue(savedTask);

      const result = await service.create(taskDto);
      expect(result).toEqual(savedTask);
      expect(mockTaskModel.create).toHaveBeenCalledWith(taskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [{ title: 'Test Task' }];
      mockTaskModel.exec.mockResolvedValueOnce(tasks);
      mockTaskModel.countDocuments.mockResolvedValueOnce(1);

      const result = await service.findAll();
      expect(result.data).toEqual(tasks);
      expect(mockTaskModel.find).toHaveBeenCalled();
      expect(mockTaskModel.skip).toHaveBeenCalled();
      expect(mockTaskModel.limit).toHaveBeenCalled();
      expect(mockTaskModel.exec).toHaveBeenCalled();
    });
  });

  describe('findOneById', () => {
    it('should throw an error if task not found', async () => {
      mockTaskModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      await expect(service.findOneById('nonexistent-id')).rejects.toThrow(
        'Task with ID "nonexistent-id" not found',
      );
    });
  });
});
