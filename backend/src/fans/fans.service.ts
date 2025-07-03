import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fan } from './entities/fan.entity';

@Injectable()
export class FansService {
  constructor(
    @InjectRepository(Fan)
    private fanRepository: Repository<Fan>,
  ) {}

  async create(createFanDto: Partial<Fan>): Promise<Fan> {
    const fan = this.fanRepository.create(createFanDto);
    return await this.fanRepository.save(fan);
  }

  async findAll(): Promise<Fan[]> {
    return await this.fanRepository.find({
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

  async findOne(id: string): Promise<Fan> {
    const fan = await this.fanRepository.findOne({
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

    if (!fan) {
      throw new NotFoundException(`Fan with ID ${id} not found`);
    }

    return fan;
  }

  async findByUserId(userId: string): Promise<Fan | null> {
    return await this.fanRepository.findOne({
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

  async update(id: string, updateFanDto: Partial<Fan>): Promise<Fan> {
    const fan = await this.findOne(id);
    await this.fanRepository.update(id, updateFanDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const fan = await this.findOne(id);
    await this.fanRepository.delete(id);
  }
}