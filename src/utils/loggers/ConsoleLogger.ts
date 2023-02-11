import { getCurrentFormatDate } from '@/utils/loggers/DateTimeProvider';

export default class ConsoleLogger {

    private logger: string;

    public constructor(logger?: string) {
        if (logger) {
            this.logger = logger;
        }
    }

    public sendInformationLog(message: string, logger?: string): void {
        if (logger) {
            console.log(`${logger} [${getCurrentFormatDate()}]: ${message}`);
        } else if (this.logger) {
            console.log(`${this.logger} [${getCurrentFormatDate()}]: ${message}`);
        } else {
            console.log(`[${getCurrentFormatDate()}]: ${message}`);
        }
    }

    public sendErrorLog(message: string, logger?: string): void {
        if (logger) {
            console.log(`${logger} [${getCurrentFormatDate()}]: ${message}`);
        } else if (this.logger) {
            console.log(`${this.logger} [${getCurrentFormatDate()}]: ${message}`);
        } else {
            console.log(`[${getCurrentFormatDate()}]: ${message}`);
        }
    }

    public sendWarningLog(message: string, logger?: string): void {
        if (logger) {
            console.log(`${logger} [${getCurrentFormatDate()}]: ${message}`);
        } else if (this.logger) {
            console.log(`${this.logger} [${getCurrentFormatDate()}]: ${message}`);
        } else {
            console.log(`[${getCurrentFormatDate()}]: ${message}`);
        }
    }

    public getError(message: string, logger?: string): Error {
        if (logger) {
            return Error(`${logger} [${getCurrentFormatDate()}]: ${message}`);
        }
        if (this.logger) {
            return Error(`${this.logger} [${getCurrentFormatDate()}]: ${message}`);
        }
        return Error(`[${getCurrentFormatDate()}]: ${message}`);
    }

}
