import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { CommonErrorService } from '../services/common-error.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(CommonErrorService);
        const notifier = this.injector.get(NotificationService);

        let message;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = errorService.getServerMessage(error);
            notifier.showError(message);
        } else {
            // Client Error
            // message = errorService.getClientMessage(error);
            // notifier.showError(message);
        }

        console.error(error);
    }
}