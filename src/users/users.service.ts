import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto, userId?: string): Promise<User> {
    const user = this.usersRepository.create({
      ...createUserDto,
      createdBy: userId,
    });
    return this.usersRepository.save(user);
  }

  async findAll(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    const [users, total] = await this.usersRepository.findAndCount({
      where: { status: 'ACTIVE' },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { users, total };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id, status: 'ACTIVE' },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async findByCpf(cpf: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { cpf, status: 'ACTIVE' },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>, userId: string): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    user.updatedBy = userId;
    return this.usersRepository.save(user);
  }

  async remove(id: string, userId: string): Promise<void> {
    const user = await this.findOne(id);
    user.status = 'REMOVED';
    user.removedAt = new Date();
    user.removedBy = userId;
    await this.usersRepository.save(user);
  }
}