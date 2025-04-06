import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
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
      return this.elementService.createElementTo(createElementDto);
    });
  }

  @Post('update')
  update(
    @Body() updateElementDto: UpdateElementDto,
  ): Result<ElementInfo> {
    return handleRespond(() => {
      return this.elementService.update(updateElementDto);
    });
  }

  @Get("search")
  search(@Query("projectId") projectId: UUID, @Query("keyword") keyword: string){
    return handleRespond(() => {
      return this.elementService.list(projectId,keyword)
    })
  }

  @Delete("delete")
  delete(@Query("projectId") projectId: UUID, @Query("pageName") pageName: UUID, @Query("id") id: UUID){
    return handleRespond(() => {
      return this.elementService.delete(projectId,pageName,id)
    })
  }
}
