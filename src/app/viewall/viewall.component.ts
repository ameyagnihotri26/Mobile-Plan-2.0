import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { ConfirmlogoutComponent } from '../confirmlogout/confirmlogout.component';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent implements OnInit {

  getAllUser: any = undefined;
  durationInSeconds = 5;
  searchInputType: string = 'all';
  searchText = '';
  dataNotFound = false;
  searchRequired = false;


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
    if(this.getAllUser.length != 0){
      this.dataNotFound = false;
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
    this.searchPlan();
  }


  createPlan() {
    this.router.navigate(['./createplan']);
  }

  viewPlan() {
    this.searchInputType = 'all';
    this.getUser();
  }

  
  searchPlan = async () => {

    if(this.searchText == '' || this.searchText == null || this.searchText == undefined){
      this.searchRequired = true;
      this.dataNotFound = true;
      this.getAllUser = [];
      return;
    }else{
      this.searchRequired = false;
    }
    var response;
    if(this.searchInputType == 'all'){
      response = await fetch("http://localhost:8080/mp");
    }else if(this.searchInputType == 'id'){
      response = await fetch("http://localhost:8080/mp/" + this.searchText);
    }else if(this.searchInputType == 'name'){
      response = await fetch("http://localhost:8080/mp/name/" + this.searchText);
    }else if(this.searchInputType == 'validity'){
      response = await fetch("http://localhost:8080/mp/validity/" + this.searchText);
    }else {
      response = await fetch("http://localhost:8080/mp/description/" + this.searchText);
    }
    this.getAllUser = [];
    console.log("clicked");
    
    let res = await response.json();
    if(res.length == 0){
      this.dataNotFound = true;
      return;
    }else{
      this.dataNotFound = false;
    }
    if (res instanceof Array) {
      for(let j=0;j< res.length;j++){
        let getObject = {
          id : res[j].id,
          name: res[j].name,
          description: res[j].description,
          validity: res[j].validity
        }
        this.dataNotFound = false;
        this.getAllUser.push(getObject);
      }
    } else {
      let getObject = {
        id : res.id,
        name: res.name,
        description: res.description,
        validity: res.validity
      }
      this.dataNotFound = false;
      this.getAllUser.push(getObject);
    }

  };

  deletePlan() {
    this.router.navigate(['./delete'])
  }
  aboutUS() {
    this.router.navigate(['./aboutus']);
  }

  gettingStarted(){
    const dialogRef = this.dialog.open(ConfirmlogoutComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' + result.checkStatus);
      if (result.checkStatus == 0) {
    this.router.navigate(['./redirect']);
      }
    });

  }
  
  getSelectedSearchType(event : any){
    this.searchRequired = false;
    console.log("get event:"+event.value);
    this.searchInputType = event.value;
    if(this.searchInputType == 'all'){
      this.searchText = '';
      this.getUser();
    }else{
      this.searchText = '';
      // this.dataNotFound = true;
      // this.getAllUser = undefined;
    }
      }
    
}
