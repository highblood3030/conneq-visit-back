"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let UsersService = class UsersService {
    constructor() {
        this.usersFilePath = path.join(process.cwd(), 'src', 'database', 'users.json');
        console.log('Users file path:', this.usersFilePath); // Log the file path
    }
    // Save a new user
    async saveUser(userDto) {
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
    async updateUser(userId, userDto) {
        const users = await this.readUsersFromFile();
        // Find the index of the user to update
        const userIndex = users.findIndex((user) => user.userId === userId);
        if (userIndex === -1) {
            throw new Error(`User with ID ${userId} not found`);
        }
        // Update the user data
        users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), userDto);
        // Write the updated users array back to the file
        await this.writeUsersToFile(users);
        console.log(`User with ID ${userId} updated:`, users[userIndex]); // Log the updated user
        return users[userIndex];
    }
    // Get a user by ID
    async getAllUsers(userId) {
        const users = await this.readUsersFromFile();
        const user = users.find((user) => user.userId === userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        console.log(`User with ID ${userId} retrieved:`, user); // Log the retrieved user
        return user;
    }
    async getAllUsersList() {
        return this.readUsersFromFile();
    }
    // Delete a user by ID
    async deleteUser(userId) {
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
    async readUsersFromFile() {
        try {
            const data = await fs.promises.readFile(this.usersFilePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading users.json:', error); // Log any errors
            throw new Error('Failed to read users data');
        }
    }
    // Write users to the file
    async writeUsersToFile(users) {
        try {
            await fs.promises.writeFile(this.usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
            console.log('File successfully updated:', this.usersFilePath); // Log success
        }
        catch (error) {
            console.error('Error writing to users.json:', error); // Log any errors
            throw new Error('Failed to write users data');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map