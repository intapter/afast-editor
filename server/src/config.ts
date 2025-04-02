import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
export const DATA_PATH = path.resolve(__dirname, '../../artifact/data');

if (!existsSync(DATA_PATH)) {
  mkdirSync(DATA_PATH, { recursive: true });
}
