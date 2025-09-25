import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { CreateAttendanceLogDto } from './dtos/create-attendance-log.dto';
import { UpdateAttendanceLogDto } from './dtos/update-attendance-log.dto';
import { AttendanceLogsService } from './services/attendance-logs.service';

@Controller('attendance-logs')
export class AttendanceController {
  constructor(private readonly usersService: AttendanceLogsService) {}
  @Get('')
  public getAttendanceLogs() {
    return this.usersService.getAttendanceLogs();
  }

  @Get('/:id')
  public getAttendanceLog(@Param('id') id: string) {
    return this.usersService.getAttendanceLogById(id);
  }

  @Post()
  public createAttendanceLog(
    @Body() createAttendanceLogDto: CreateAttendanceLogDto,
  ) {
    return this.usersService.createAttendanceLog(createAttendanceLogDto);
  }

  @Put('/:id')
  public updateAttendanceLog(
    @Param('id') id: string,
    @Body() updateAttendanceLogDto: UpdateAttendanceLogDto,
  ) {
    return this.usersService.updateAttendanceLog(id, updateAttendanceLogDto);
  }

  @Delete('/:id')
  public deleteAttendanceLog(@Param('id') id: string) {
    return this.usersService.deleteAttendanceLog(id);
  }
}
