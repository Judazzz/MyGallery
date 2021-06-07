import { isDevMode } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {
    private readonly hssDebugPrefix = '[MyNameIsJonas Debug] ';
    private readonly hssPublicPrefix = '[MyNameIsJonas] ';

    constructor() {}

    static doPrint(prefix: string, value: any, level: any) {
        switch (level) {
            case 'log':
                console.log(prefix, value);
                break;
            case 'info':
                console.info(prefix, value);
                break;
            case 'warn':
                console.warn(prefix, value);
                break;
            case 'error':
                console.error(prefix, value);
                break;
            case 'debug':
                console.debug(prefix, value);
                break;
            default:
                console.log(prefix, value);
                break;
        }
    }

    public print(prefix: string, value: any, level: any, devOnly: boolean = true): void {
        if (devOnly) {
            if (isDevMode()) {
                LoggingService.doPrint(this.hssDebugPrefix + prefix, value, level);
            }
        } else {
            LoggingService.doPrint( this.hssPublicPrefix + prefix, value, level);
        }
    }
}
