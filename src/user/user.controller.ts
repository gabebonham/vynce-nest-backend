import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './update-user.dto';
import { UserResponseDto } from './user-response.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UserResponseDto> {
        return await this.userService.update(id, data);
    }
}