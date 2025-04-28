import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  private readonly usersFilePath = path.join(process.cwd(), 'src', 'database', 'users.json');

  constructor() {
    console.log('Users file path:', this.usersFilePath); // Log the file path
  }

  // Save a new user
  async saveUser(userDto: UserDto): Promise<UserDto> {
    const users = await this.readUsersFromFile();

    // Check for duplicate userId
    if (users.some((user) => user.userId === userDto.userId)) {
      throw new Error(`User with ID ${userDto.userId} already exists`);
    }

    users.push(userDto);
    await this.writeUsersToFile(users);

    console.log('User saved:', userDto); // Log the saved user
    return userDto;
  }

  // Update an existing user
  async updateUser(userId: string, userDto: UserDto): Promise<UserDto> {
    const users = await this.readUsersFromFile();

    // Find the index of the user to update
    const userIndex = users.findIndex((user) => user.userId === userId);

    if (userIndex === -1) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Update the user data
    users[userIndex] = { ...users[userIndex], ...userDto };

    // Write the updated users array back to the file
    await this.writeUsersToFile(users);

    console.log(`User with ID ${userId} updated:`, users[userIndex]); // Log the updated user
    return users[userIndex];
  }

  // Get a user by ID
  async getAllUsers(userId: string): Promise<UserDto> {
    const users = await this.readUsersFromFile();
    const user = users.find((user) => user.userId === userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    console.log(`User with ID ${userId} retrieved:`, user); // Log the retrieved user
    return user;
  }

  async getAllUsersList(): Promise<UserDto[]> {
    return this.readUsersFromFile();
  }
  
  
  // Delete a user by ID
  async deleteUser(userId: string): Promise<void> {
    const users = await this.readUsersFromFile();

    // Filter out the user to delete
    const updatedUsers = users.filter((user) => user.userId !== userId);

    if (users.length === updatedUsers.length) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Write the updated users array back to the file
    await this.writeUsersToFile(updatedUsers);

    console.log(`User with ID ${userId} deleted`); // Log the deletion
  }

  // Read users from the file
  private async readUsersFromFile(): Promise<UserDto[]> {
    try {
      const data = await fs.promises.readFile(this.usersFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users.json:', error); // Log any errors
      throw new Error('Failed to read users data');
    }
  }

  // Write users to the file
  private async writeUsersToFile(users: UserDto[]): Promise<void> {
    try {
      await fs.promises.writeFile(this.usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
      console.log('File successfully updated:', this.usersFilePath); // Log success
    } catch (error) {
      console.error('Error writing to users.json:', error); // Log any errors
      throw new Error('Failed to write users data');
    }
  }
}