import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { DATA_PATH } from 'src/config';

const HISTORY_PATH = path.join(DATA_PATH, 'projects.json');

@Injectable()
export class ProjectService {
  list(): ProjectEntity[] {
    if (!fs.existsSync(HISTORY_PATH)) {
      fs.writeFileSync(HISTORY_PATH, '[]');
      return [];
    } else {
      return JSON.parse(
        fs.readFileSync(HISTORY_PATH, 'utf-8'),
      ) as ProjectEntity[];
    }
  }
  add(project: ProjectEntity) {
    const history = this.list();
    history.push(project);
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history));
  }
  detail(id: string): ProjectInfo {
    const project = this.list().find((p) => p.id === id);
    if (!project) throw 'Project not found'
    if(!fs.existsSync(project.path)) throw 'Project path not exists'
    const indexPath = path.join('src/index.af');
    return JSON.parse(fs.readFileSync(path.resolve(project.path,indexPath), 'utf-8')) as unknown as ProjectInfo
  }
}
