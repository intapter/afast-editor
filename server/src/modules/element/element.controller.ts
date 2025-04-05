import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ElementService } from './element.service';
import { Result } from 'src/result/result';
import { handleRespond } from 'src/utils/result';
import { UUID } from 'crypto';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Post('createElementTo')
  createElementTo(
    @Body() createElementDto: CreateElementDto,
  ): Result<ElementInfo> {
    return handleRespond(() => {
      return this.elementService.createElementDto(createElementDto);
    });
  }

  @Get("search")
  search(@Query("projectId") projectId: UUID, @Query("keyword") keyword: string){
    return handleRespond(() => {
      return this.elementService.list(projectId,keyword)
    })
  }
}
