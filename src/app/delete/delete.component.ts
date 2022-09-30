import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  getId: number | undefined;
  constructor(public router: Router) { }

  ngOnInit(): void {
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

  updatePlan(){
   
    this.router.navigate(['./update']);
    
  }

}
