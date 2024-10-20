import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task', example: 'My Task' })
  title: string;
  
  @ApiProperty({ description: 'A description of the task', example: 'This is a sample task', required: false })
  description?: string;
  
  @ApiProperty({ description: 'Priority of the task', example: 'high', required: false })
  priority?: 'low' | 'medium' | 'high';
  
  @ApiProperty({ description: 'Due date of the task', example: '2024-12-31', required: false })
  dueDate?: Date;
}
