import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import {
  CreateAttendanceLogDto,
  CreateManyAttendanceLogDto,
} from './dtos/create-attendance-log.dto';
import { UpdateAttendanceLogDto } from './dtos/update-attendance-log.dto';
import { AttendanceLogsService } from './services/attendance-logs.service';
import { GetAttendanceLogDto } from './dtos/get-attendance-logs.dto';

@Controller('attendance-logs')
export class AttendanceController {
  constructor(private readonly usersService: AttendanceLogsService) {}
  @Get('')
  public getAttendanceLogs(@Query() query: GetAttendanceLogDto) {
    return this.usersService.getAttendanceLogs(query);
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

  @Post('/many')
  public createManyAttendanceLog(
    @Body() createManyAttendanceLogDto: CreateManyAttendanceLogDto,
  ) {
    return this.usersService.createManyAttendanceLog(
      createManyAttendanceLogDto,
    );
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
