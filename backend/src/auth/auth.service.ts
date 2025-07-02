import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { Celebrity } from '../entities/celebrity.entity';
import { Fan } from '../entities/fan.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Celebrity)
    private celebrityRepository: Repository<Celebrity>,
    @InjectRepository(Fan)
    private fanRepository: Repository<Fan>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, role, firstName, lastName, ...extraData } = registerDto;

    // Validate input
    if (!email || !password) {
      throw new ConflictException('Email and password are required');
    }

    if (password.length < 6) {
      throw new ConflictException('Password must be at least 6 characters long');
    }

    // Check if user already exists (case-insensitive)
    const existingUser = await this.userRepository.findOne({ 
      where: { email: email.toLowerCase().trim() } 
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password with salt rounds
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Verify password was hashed
    if (!hashedPassword || hashedPassword === password) {
      throw new ConflictException('Password hashing failed');
    }

    // Create user
    const user = this.userRepository.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || UserRole.FAN,
      isActive: true,
    });

    const savedUser = await this.userRepository.save(user);

    // Verify user was saved with hashed password
    if (!savedUser || !savedUser.password || savedUser.password === password) {
      throw new ConflictException('User registration failed');
    }

    // Create profile based on role
    if (role === UserRole.CELEBRITY) {
      const celebrity = this.celebrityRepository.create({
        user: savedUser,
        firstName,
        lastName,
        stageName: extraData.stageName,
        bio: extraData.bio,
        industries: extraData.industries || [],
      });
      await this.celebrityRepository.save(celebrity);
    } else {
      const fan = this.fanRepository.create({
        user: savedUser,
        firstName,
        lastName,
        dateOfBirth: extraData.dateOfBirth,
        location: extraData.location,
        interests: [],
      });
      await this.fanRepository.save(fan);
    }

    // Generate JWT token
    const payload = { 
      sub: savedUser.id, 
      email: savedUser.email, 
      role: savedUser.role,
      iat: Math.floor(Date.now() / 1000)
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        role: savedUser.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Validate input
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }

    // Find user with explicit where clause
    const user = await this.userRepository.findOne({ 
      where: { email: email.toLowerCase().trim() },
      select: ['id', 'email', 'password', 'role', 'isActive']
    });
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user account is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Verify password exists and is not empty
    if (!user.password) {
      throw new UnauthorizedException('Invalid account configuration');
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      iat: Math.floor(Date.now() / 1000)
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string) {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
