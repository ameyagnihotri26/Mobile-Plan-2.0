import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  getId: number | undefined;
  respStatus: number | undefined;
  requiredId: boolean = false;

  constructor(public router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  removePlan = async (id: any) => {
    console.log("Show ID:" + id);
    let response2 = await fetch("http://localhost:8080/mp/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    this.respStatus = response2.status;
    //this.getUser();
    if (this.respStatus == 200) {
      this.getId = undefined;
      
    }
    if (this.respStatus == 404) {
      this.requiredId = false;
    }
  }
  createPlan() {
    this.router.navigate(['./createplan']);
  }

  viewPlan() {
    this.router.navigate(['./viewall']);
  }

  searchPlan() {
    this.router.navigate(['./search']);
  }

  deletePlan() {
    this.router.navigate(['./delete'])
  }
  aboutUS() {
    this.router.navigate(['./aboutus']);
  }

  gettingStarted() {
    this.router.navigate(['./redirect']);
  }

  updatePlan() {

    this.router.navigate(['./update']);

  }
  openDialog(id: any): void {
    if (id == null) {
      this.requiredId = true;
      this.respStatus = undefined;
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' + result.checkStatus);
      if (result.checkStatus == 0) {
        this.removePlan(id);
      }
    });
  }

  checkInputId(event: any) {
    console.log("Check input:" + event.key);

    if (event.key != '') {
      this.requiredId = false;
    } else {
      this.requiredId = true;
    }

  }
}
