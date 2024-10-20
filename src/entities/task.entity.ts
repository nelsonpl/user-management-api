import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['low', 'medium', 'high'], default: 'medium' })
  priority: string;

  @Prop()
  dueDate: Date;

  @Prop({ enum: ['pending', 'completed', 'archived'], default: 'pending' })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
