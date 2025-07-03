import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Celebrity } from './entities/celebrity.entity';

@Injectable()
export class CelebritiesService {
  constructor(
    @InjectRepository(Celebrity)
    private celebrityRepository: Repository<Celebrity>,
  ) {}

  async create(createCelebrityDto: Partial<Celebrity>): Promise<Celebrity> {
    const celebrity = this.celebrityRepository.create(createCelebrityDto);
    return await this.celebrityRepository.save(celebrity);
  }

  async findAll(): Promise<Celebrity[]> {
    return await this.celebrityRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Celebrity> {
    const celebrity = await this.celebrityRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
    });

    if (!celebrity) {
      throw new NotFoundException(`Celebrity with ID ${id} not found`);
    }

    return celebrity;
  }

  async findByUserId(userId: string): Promise<Celebrity | null> {
    return await this.celebrityRepository.findOne({
      where: { userId },
      relations: ['user'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
    });
  }

  async update(id: string, updateCelebrityDto: Partial<Celebrity>): Promise<Celebrity> {
    const celebrity = await this.findOne(id);
    await this.celebrityRepository.update(id, updateCelebrityDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const celebrity = await this.findOne(id);
    await this.celebrityRepository.delete(id);
  }
}