import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

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
  dialog: any;

  constructor(private router: Router,
    private httpClient : HttpClient) { }

  ngOnInit(): void {
    // this.searchPlan();
  }

  
  updatePlan(data: any) {
    console.log(data);
    this.router.navigate(['/update/'],{ queryParams: { id:data } });
  }


  
 
  removePlan(id: any) {
    console.log("Show ID:" + id);

  }

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
    this.router.navigate(['./redirect']);
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
    // response = await fetch("http://localhost:8080/mp/" + this.searchText);
    
    let res = await response.json();
    if(res.length == 0){
      this.dataNotFound = true;
      return;
    }else{
      this.dataNotFound = false;
    }
    if (res instanceof Array) {
      //JSON Array
      for(let j=0;j< res.length;j++){
        let getObject = {
          id : res[j].id,
          name: res[j].name,
          description: res[j].description,
          validity: res[j].validity
        }
        // var gett = res;
        this.getResult.push(getObject);
      }
    } else {
      //JSON Object 
      let getObject = {
        id : res.id,
        name: res.name,
        description: res.description,
        validity: res.validity
      }
      // var gett = res;
      this.getResult.push(getObject);
    }

  };


  getSelectedSearchType(event : any){
console.log("get event:"+event.value);
this.searchInputType = event.value;
  }

}

