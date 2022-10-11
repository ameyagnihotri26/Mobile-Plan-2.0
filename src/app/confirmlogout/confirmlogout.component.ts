import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationdialogComponent, DialogData } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-confirmlogout',
  templateUrl: './confirmlogout.component.html',
  styleUrls: ['./confirmlogout.component.css']
})
export class ConfirmlogoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  cancel(): void {
    let data = {
      checkStatus:1
    }
    this.dialogRef.close(data);
  }

  logout(){
    let data = {
      checkStatus:0
    }
    this.dialogRef.close(data);
  }
}
