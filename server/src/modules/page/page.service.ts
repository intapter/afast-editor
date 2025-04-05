import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ProjectService } from '../project/project.service';
import { UUID } from 'crypto';

@Injectable()
export class PageService {
  constructor(private readonly projectService: ProjectService) {}

  getPagePath(projectId: UUID, pageName: string) {
    const list = this.projectService.list();
    const projectEntity = list.find((p) => projectId === p.id);
    if (!projectEntity) throw `Project ${projectId} not found`;
    const projectPath = projectEntity.path;
    if (!projectPath) throw `Project path ${projectPath} doesn't exist`;
    const project = this.projectService.detail(projectId);
    if (!project.routes) {
      throw "This project doesn't have routes";
    }
    const route = project.routes[pageName];
    if (!route) throw 'Not found page `' + pageName + '`';
    let src = route.src;
    if (!src) throw 'Missing src of page `' + pageName + '`';
    if (project.alias) {
      for (const a of Object.keys(project.alias)) {
        if (src.startsWith(a)) {
          src = src.replace(a, project.alias[a]);
          break;
        }
      }
    }
    const p = path.resolve(projectPath, src);
    if (!fs.existsSync(p)) throw `Page path ${p} doesn't exist`;
    return p;
  }

  update(projectId: UUID, pageName: string, data: PageInfo) {
    const p = this.getPagePath(projectId, pageName);
    fs.writeFileSync(p, JSON.stringify(data))
  }

  detail(projectId: UUID, pageName: string): PageInfo {
    const p = this.getPagePath(projectId, pageName);
    return JSON.parse(String(fs.readFileSync(p))) as unknown as PageInfo;
  }
}
