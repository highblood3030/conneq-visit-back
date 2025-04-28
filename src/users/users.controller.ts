import { Body, Controller, Param, Post, Get, Put, Delete, HttpCode } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Helper function for manual validation
  private validateUserDto(userDto: UserDto): string[] {
    const errors: string[] = [];


    // Add more validation rules as needed
    return errors;
  }

  @Post('save-user')
  async saveUser(@Body() userDto: UserDto): Promise<{ message: string; data?: UserDto; errors?: string[] }> {
    const errors = this.validateUserDto(userDto);

    if (errors.length > 0) {
      return {
        message: 'Validation failed',
        errors,
      };
    }

    try {
      const savedUser = await this.usersService.saveUser(userDto);
      return {
        message: 'User saved successfully',
        data: savedUser,
      };
    } catch (error: any) {
      console.error('Error saving user:', error);
      return {
        message: 'Failed to save user',
        errors: [error.message || 'An unknown error occurred'],
      };
    }
  }

  @Put('update-user/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() userDto: UserDto,
  ): Promise<{ message: string; data?: UserDto; errors?: string[] }> {
    const errors = this.validateUserDto(userDto);

    if (errors.length > 0) {
      return {
        message: 'Validation failed',
        errors,
      };
    }

    try {
      console.log('Updating user with ID:', userId);
      const updatedUser = await this.usersService.updateUser(userId, userDto);
      return {
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error: any) {
      console.error('Error updating user:', error);
      return {
        message: 'Failed to update user',
        errors: [error.message || 'An unknown error occurred'],
      };
    }
  }

  @Get()
  async getAllUsers(): Promise<{ message: string; data?: UserDto[]; errors?: string[] }> {
    try {
      const users = await this.usersService.getAllUsersList(); // <-- coming next
      return {
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error: any) {
      console.error('Error retrieving users:', error);
      return {
        message: 'Failed to retrieve users',
        errors: [error.message || 'An unknown error occurred'],
      };
    }
  }
  
  

  @Delete('delete-user/:userId')
  async deleteUser(
    @Param('userId') userId: string,
  ): Promise<{ message: string; errors?: string[] }> {
    try {
      console.log('Deleting user with ID:', userId);
      await this.usersService.deleteUser(userId);
      return {
        message: 'User deleted successfully',
      };
    } catch (error: any) {
      console.error('Error deleting user:', error);
      return {
        message: 'Failed to delete user',
        errors: [error.message || 'An unknown error occurred'],
      };
    }
  }
}