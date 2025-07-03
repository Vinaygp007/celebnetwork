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
import { FansService } from './fans.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('fans')
export class FansController {
  constructor(private readonly fansService: FansService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFanDto: any, @Request() req: any) {
    return this.fansService.create({
      ...createFanDto,
      userId: req.user.sub,
    });
  }

  @Get()
  findAll() {
    return this.fansService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return this.fansService.findByUserId(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fansService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateFanDto: any) {
    return this.fansService.update(id, updateFanDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.fansService.remove(id);
  }
}