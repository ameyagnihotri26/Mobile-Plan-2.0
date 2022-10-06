import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-createdialoge',
  templateUrl: './createdialoge.component.html',
  styleUrls: ['./createdialoge.component.css']
})
export class CreatedialogeComponent implements OnInit {

 
  constructor(
    public dialogRef: MatDialogRef<CreatedialogeComponent>,
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

  remove(){
    let data = {
      checkStatus:0
    }
    this.dialogRef.close(data);
  }

}