import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent implements OnInit {

  getAllUser: any;
  durationInSeconds = 5;


  constructor(private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
   
    this.getUser();
  }



  getUser = async () => {
    console.log("clicked");
    let response = await fetch("http://localhost:8080/mp");
    let res = await response.json();
    console.log("get All User:" + JSON.stringify(res));
    this.getAllUser = (res);

    for (var i = 0; i < res.length; i++) {

    }
  };

  updatePlan(data: any) {
    console.log(data);
    this.router.navigate(['/update/'],{ queryParams: { id:data } });

  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' + result.checkStatus);
      if (result.checkStatus == 0) {
        this.removePlan(id);
      }
    });
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
    let respStatus = response2.status;
    this.getUser();
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

  gettingStarted(){
    this.router.navigate(['./redirect']);
  }
}
