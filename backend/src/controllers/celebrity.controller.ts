import { Controller, Get, Post, Body, Param, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { CelebrityService } from '../services/celebrity.service';
import { AiService } from '../services/ai.service';
import { PdfService } from '../services/pdf.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateCelebrityDto } from '../dto/create-celebrity.dto';
import { SearchCelebrityDto } from '../dto/search-celebrity.dto';

@Controller('celebrities')
export class CelebrityController {
  constructor(
    private readonly celebrityService: CelebrityService,
    private readonly aiService: AiService,
    private readonly pdfService: PdfService,
  ) {}

  @Get()
  async findAll() {
    return this.celebrityService.findAll();
  }

  @Get('featured')
  async getFeatured() {
    return this.celebrityService.getFeatured();
  }

  @Post('search')
  async searchCelebrities(@Body() searchDto: SearchCelebrityDto) {
    return this.aiService.searchCelebrities(searchDto.query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCelebrityDto: CreateCelebrityDto) {
    return this.celebrityService.create(createCelebrityDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.celebrityService.findOne(id);
  }

  @Get(':id/pdf')
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const celebrity = await this.celebrityService.findOne(id);
    const pdfBuffer = await this.pdfService.generateCelebrityProfilePdf(celebrity);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${celebrity.firstName}-${celebrity.lastName}-profile.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    
    res.send(pdfBuffer);
  }

  @Post(':id/follow')
  @UseGuards(JwtAuthGuard)
  async followCelebrity(@Param('id') celebrityId: string, @Body('fanId') fanId: string) {
    return this.celebrityService.followCelebrity(celebrityId, fanId);
  }

  @Post(':id/unfollow')
  @UseGuards(JwtAuthGuard)
  async unfollowCelebrity(@Param('id') celebrityId: string, @Body('fanId') fanId: string) {
    return this.celebrityService.unfollowCelebrity(celebrityId, fanId);
  }
}
