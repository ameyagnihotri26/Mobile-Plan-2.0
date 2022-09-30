import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router,
    private httpClient : HttpClient) { }

  ngOnInit(): void {
    // this.searchPlan();
  }

  
  updatePlan(data: any) {
    console.log(data);
    this.router.navigate(['./update']);
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
    this.getResult = [];
    console.log("clicked");
    let response = await fetch("http://localhost:8080/mp/" + this.searchText);
    if(response.status == 404){
      this.dataNotFound = true;
      return;
    }else{
      this.dataNotFound = false;
    }
    let res = await response.json();
    console.log("get Single User:" + JSON.stringify(res));
    let getObject = {
      id : res.id,
      name: res.name,
      description: res.description,
      validity: res.validity
    }
    var gett = res;
    this.getResult.push(gett);

  };


}
