import { Controller, Get, Param, UseGuards, Put, Body, Post, Delete, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FansService } from './fans.service';

@Controller('fans')
export class FansController {
  constructor(private fansService: FansService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fansService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateData: Partial<any>) {
    return this.fansService.update(id, updateData);
  }

  @Post(':id/favorites/:celebrityId')
  @UseGuards(AuthGuard('jwt'))
  addFavorite(@Param('id') id: string, @Param('celebrityId') celebrityId: string) {
    return this.fansService.addFavoriteCelebrity(id, celebrityId);
  }

  @Delete(':id/favorites/:celebrityId')
  @UseGuards(AuthGuard('jwt'))
  removeFavorite(@Param('id') id: string, @Param('celebrityId') celebrityId: string) {
    return this.fansService.removeFavoriteCelebrity(id, celebrityId);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  findByUserId(@Param('userId') userId: string) {
    return this.fansService.findByUserId(userId);
  }
}
