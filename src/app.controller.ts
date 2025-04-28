import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './services/app.service';
import { FileDbService } from './services/file-db.service';

@Controller()
export class AppController {
  constructor
  (private readonly appService: AppService,
   private readonly fileDbService: FileDbService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users') 
  async saveData(@Body() inputData: any) { 
    try {
      console.log("recieved data:", inputData);
      const data = await this.fileDbService.readData('users');
      console.log("Current data in users.json:", data);
    data.push(inputData);
    await this.fileDbService.writeData('users', data);
    console.log("Updated data in users.json:", data); // Log the updated data
    return { message: 'Data saved successfully!' };
  } catch (error) {
    console.error("Error saving data:", error); // Log the error
    throw error; // Re-throw the error to send a 500 response
  }
  
}
}