import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fan } from '../entities/fan.entity';

@Injectable()
export class FansService {
  constructor(
    @InjectRepository(Fan)
    private fanRepository: Repository<Fan>,
  ) {}

  async findAll(): Promise<Fan[]> {
    return this.fanRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<Fan> {
    return this.fanRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findByUserId(userId: string): Promise<Fan> {
    return this.fanRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async update(id: string, updateData: Partial<Fan>): Promise<Fan> {
    await this.fanRepository.update(id, updateData);
    return this.findOne(id);
  }

  async addFavoriteCelebrity(fanId: string, celebrityId: string): Promise<Fan> {
    const fan = await this.findOne(fanId);
    if (!fan.favoriteCelebrities.includes(celebrityId)) {
      fan.favoriteCelebrities.push(celebrityId);
      await this.fanRepository.save(fan);
    }
    return fan;
  }

  async removeFavoriteCelebrity(fanId: string, celebrityId: string): Promise<Fan> {
    const fan = await this.findOne(fanId);
    fan.favoriteCelebrities = fan.favoriteCelebrities.filter(id => id !== celebrityId);
    await this.fanRepository.save(fan);
    return fan;
  }
}
