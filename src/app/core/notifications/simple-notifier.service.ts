import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';

@Injectable()
export class NotifierService {

  constructor(private matSnackBar: MatSnackBar) {
  }

  public notifySuccess(message: string, timeOut: number = 0) {
    if (timeOut > 0) {
      this.matSnackBar.open(message, 'Ok', {duration: timeOut});
    } else {
      this.matSnackBar.open(message, 'Ok');
    }
  }

  public notifyError(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.matSnackBar.open(message, action);
  }

}
