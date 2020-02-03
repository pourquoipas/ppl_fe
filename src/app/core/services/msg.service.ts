import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private _snackBar: MatSnackBar) {

  }

  public toast(msg: string, action: string = null, duration = 2000) {
    this.openSnackBar(msg, action, duration);
  }

  private openSnackBar(message: string, action: string, duration: number) {
    
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

}
