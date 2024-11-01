import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class InitialUserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = userRepository.create({
      name: 'Admin',
      cpf: '12345678909', 
      password: hashedPassword,
      birthDate: new Date('1990-01-01'),
      street: 'Rua Principal',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000',
      createdBy: 'SYSTEM',
      status: 'ACTIVE'
    });

    await userRepository.save(adminUser);
  }
}