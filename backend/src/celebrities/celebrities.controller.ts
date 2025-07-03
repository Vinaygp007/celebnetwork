import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseGuards,
  Request 
} from '@nestjs/common';
import { CelebritiesService } from './celebrities.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('celebrities')
export class CelebritiesController {
  constructor(private readonly celebritiesService: CelebritiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCelebrityDto: any, @Request() req: any) {
    return this.celebritiesService.create({
      ...createCelebrityDto,
      userId: req.user.sub,
    });
  }

  @Get()
  findAll() {
    return this.celebritiesService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return this.celebritiesService.findByUserId(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.celebritiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCelebrityDto: any) {
    return this.celebritiesService.update(id, updateCelebrityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.celebritiesService.remove(id);
  }
}