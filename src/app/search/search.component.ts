import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { ConfirmlogoutComponent } from '../confirmlogout/confirmlogout.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText = '';
  getResult: any = [];
  dataNotFound = false;
  searchRequired = false;
  searchInputType: string = 'id';
  // dialog: any;

  constructor(private router: Router,
    public dialog: MatDialog,
    private httpClient : HttpClient) { }

  ngOnInit(): void {
    // this.searchPlan();
  }

  
  updatePlan(data: any) {
    console.log(data);
    this.router.navigate(['/update/'],{ queryParams: { id:data } });
  }


  
 
  removePlan = async (id: any) => {
    console.log("Show ID:" + id);
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

  

  getUser = async () => {
    console.log("clicked");
    let response = await fetch("http://localhost:8080/mp");
    let res = await response.json();
    console.log("get All User:" + JSON.stringify(res));
    this.getResult = (res);
  };

  createPlan() {
    this.router.navigate(['./createplan']);
  }

  viewPlan() {
    this.router.navigate(['./viewall']);
  }

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

  searchPlan = async () => {

    if(this.searchText == ''){
      this.searchRequired = true;
      return;
    }else{
      this.searchRequired = false;
    }
    var response;
    if(this.searchInputType == 'id'){
      response = await fetch("http://localhost:8080/mp/" + this.searchText);
    }else if(this.searchInputType == 'name'){
      response = await fetch("http://localhost:8080/mp/name/" + this.searchText);
    }else if(this.searchInputType == 'validity'){
      response = await fetch("http://localhost:8080/mp/validity/" + this.searchText);
    }else {
      response = await fetch("http://localhost:8080/mp/description/" + this.searchText);
    }
    this.getResult = [];
    console.log("clicked");
    
    let res = await response.json();
    if(res.id == null){
      this.dataNotFound = true;
      return;
    }
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
        this.getResult.push(getObject);
      }
    } else {
      let getObject = {
        id : res.id,
        name: res.name,
        description: res.description,
        validity: res.validity
      }
      this.getResult.push(getObject);
    }

  };


  
  openDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' + result.checkStatus);
      if (result.checkStatus == 0) {
        this.removePlan(id);
      }
    });
  }


  getSelectedSearchType(event : any){
console.log("get event:"+event.value);
this.searchInputType = event.value;
  }

}

