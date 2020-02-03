import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
	name: string;
	animal: string;
}

@Component({
  selector: 'app-test-dialog-pick',
  templateUrl: './test-dialog-pick.component.html',
  styleUrls: ['./test-dialog-pick.component.scss']
})
export class TestDialogPickComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<TestDialogPickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
onNoClick(): void {
    this.dialogRef.close();
  }

}
