import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'CPF already exists.',
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Request() req,
  ): Promise<User> {
    return this.usersService.create(createUserDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all active users.',
    type: [User],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<{ users: User[]; total: number }> {
    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User UUID',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the user.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('cpf/:cpf')
  @ApiOperation({ summary: 'Get a user by CPF' })
  @ApiParam({
    name: 'cpf',
    required: true,
    description: 'User CPF',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the user.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async findByCpf(
    @Param('cpf') cpf: string,
  ): Promise<User> {
    return this.usersService.findByCpf(cpf);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User UUID',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User UUID',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req,
  ): Promise<void> {
    return this.usersService.remove(id, req.user.id);
  }
}