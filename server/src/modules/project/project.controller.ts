import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Result } from 'src/result/result';
import { randomUUID } from 'crypto';
import { existsSync } from 'fs';
import { handleRespond } from 'src/utils/result';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('list')
  list(): Result<ProjectEntity[]> {
    return Result.success(this.projectService.list());
  }

  @Post('add')
  add(@Body() project: ProjectEntity) {
    if (!project || !project.name || !project.path)
      return Result.fail('Invalid project');
    if (!existsSync(project.path))
      return Result.fail('Project path not exists');
    project.time = Date.now();
    project.id = randomUUID();
    return handleRespond<void>(() => {
      return this.projectService.add(project)
    })
  }

  @Get("detail/:id")
  detail(@Param("id") id: string): Result<ProjectInfo> {
    return handleRespond<ProjectInfo>(() => {
      return this.projectService.detail(id)
    })
  }
}
