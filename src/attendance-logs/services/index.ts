import { GetAttendanceLogsService } from "./get-attendance-logs.service";
import { CreateAttendanceLogService } from "./create-attendance-log.service";
import { AttendanceLogsService } from "./attendance-logs.service";

export const AttendanceLogsServices = [
    AttendanceLogsService,
    GetAttendanceLogsService,
    CreateAttendanceLogService,
]