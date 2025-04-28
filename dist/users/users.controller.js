"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_dto_1 = require("./dto/users.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    // Helper function for manual validation
    validateUserDto(userDto) {
        const errors = [];
        // Add more validation rules as needed
        return errors;
    }
    async saveUser(userDto) {
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
        }
        catch (error) {
            console.error('Error saving user:', error);
            return {
                message: 'Failed to save user',
                errors: [error.message || 'An unknown error occurred'],
            };
        }
    }
    async updateUser(userId, userDto) {
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
        }
        catch (error) {
            console.error('Error updating user:', error);
            return {
                message: 'Failed to update user',
                errors: [error.message || 'An unknown error occurred'],
            };
        }
    }
    async getAllUsers() {
        try {
            const users = await this.usersService.getAllUsersList(); // <-- coming next
            return {
                message: 'Users retrieved successfully',
                data: users,
            };
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            return {
                message: 'Failed to retrieve users',
                errors: [error.message || 'An unknown error occurred'],
            };
        }
    }
    async deleteUser(userId) {
        try {
            console.log('Deleting user with ID:', userId);
            await this.usersService.deleteUser(userId);
            return {
                message: 'User deleted successfully',
            };
        }
        catch (error) {
            console.error('Error deleting user:', error);
            return {
                message: 'Failed to delete user',
                errors: [error.message || 'An unknown error occurred'],
            };
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('save-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "saveUser", null);
__decorate([
    (0, common_1.Put)('update-user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Delete)('delete-user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map