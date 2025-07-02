import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Celebrity } from '../entities/celebrity.entity';
import { Fan } from '../entities/fan.entity';
import { Following } from '../entities/following.entity';
import { CreateCelebrityDto } from '../dto/create-celebrity.dto';

@Injectable()
export class CelebrityService {
  constructor(
    @InjectRepository(Celebrity)
    private celebrityRepository: Repository<Celebrity>,
    @InjectRepository(Fan)
    private fanRepository: Repository<Fan>,
    @InjectRepository(Following)
    private followingRepository: Repository<Following>,
  ) {}

  async create(createCelebrityDto: CreateCelebrityDto): Promise<Celebrity> {
    const celebrity = this.celebrityRepository.create({
      ...createCelebrityDto,
      followersCount: createCelebrityDto.estimatedFanbase || 0,
    });
    
    return this.celebrityRepository.save(celebrity);
  }

  async findAll(): Promise<Celebrity[]> {
    return this.celebrityRepository.find({
      relations: ['followers'],
      order: { followersCount: 'DESC' }
    });
  }

  async getFeatured(limit = 10): Promise<Celebrity[]> {
    return this.celebrityRepository.find({
      where: { isVerified: true },
      order: { followersCount: 'DESC' },
      take: limit
    });
  }

  async findOne(id: string): Promise<Celebrity> {
    const celebrity = await this.celebrityRepository.findOne({
      where: { id },
      relations: ['followers', 'user']
    });

    if (!celebrity) {
      throw new NotFoundException('Celebrity not found');
    }

    // Increment profile views
    celebrity.profileViews += 1;
    await this.celebrityRepository.save(celebrity);

    return celebrity;
  }

  async followCelebrity(celebrityId: string, fanId: string): Promise<{ message: string }> {
    const celebrity = await this.findOne(celebrityId);
    const fan = await this.fanRepository.findOne({ where: { id: fanId } });

    if (!fan) {
      throw new NotFoundException('Fan not found');
    }

    // Check if already following
    const existingFollow = await this.followingRepository.findOne({
      where: { celebrity: { id: celebrityId }, fan: { id: fanId } }
    });

    if (existingFollow) {
      return { message: 'Already following this celebrity' };
    }

    // Create following relationship
    const following = this.followingRepository.create({
      celebrity,
      fan
    });

    await this.followingRepository.save(following);

    // Update followers count
    celebrity.followersCount += 1;
    await this.celebrityRepository.save(celebrity);

    return { message: 'Successfully followed celebrity' };
  }

  async unfollowCelebrity(celebrityId: string, fanId: string): Promise<{ message: string }> {
    const following = await this.followingRepository.findOne({
      where: { celebrity: { id: celebrityId }, fan: { id: fanId } }
    });

    if (!following) {
      return { message: 'Not following this celebrity' };
    }

    await this.followingRepository.remove(following);

    // Update followers count
    const celebrity = await this.findOne(celebrityId);
    celebrity.followersCount = Math.max(0, celebrity.followersCount - 1);
    await this.celebrityRepository.save(celebrity);

    return { message: 'Successfully unfollowed celebrity' };
  }

  async getCelebrityStats(celebrityId: string): Promise<{
    followersCount: number;
    profileViews: number;
    rating: number;
  }> {
    const celebrity = await this.findOne(celebrityId);
    
    return {
      followersCount: celebrity.followersCount,
      profileViews: celebrity.profileViews,
      rating: celebrity.rating
    };
  }

  async searchByName(query: string): Promise<Celebrity[]> {
    return this.celebrityRepository
      .createQueryBuilder('celebrity')
      .where('celebrity.firstName ILIKE :query', { query: `%${query}%` })
      .orWhere('celebrity.lastName ILIKE :query', { query: `%${query}%` })
      .orWhere('celebrity.stageName ILIKE :query', { query: `%${query}%` })
      .orderBy('celebrity.followersCount', 'DESC')
      .getMany();
  }
}
