import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileDbService {
  private readonly dbPath = path.join(
    process.env.NODE_ENV === 'production' ? path.join(process.cwd(), 'dist') : process.cwd(),
    'src/database'
  );
  

  async readData(fileName: string): Promise<any[]> {
    const filePath = path.join(this.dbPath, `${fileName}.json`);
    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(filePath, JSON.stringify([])); // Create file if it doesn't exist
    }
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  async writeData(fileName: string, data: any[]): Promise<void> {
    const filePath = path.join(this.dbPath, `${fileName}.json`);
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
  }
}