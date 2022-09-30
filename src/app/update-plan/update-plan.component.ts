import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent implements OnInit {

  getPlanId: any;
  planId: any;
  planName: any;
  planValidity: any;
  planDesc: any;

  notExist: boolean = false;
  planIdRequired: boolean = false;
  planNameRequired : boolean = false;
  planValidityRequired : boolean = false;
  respStatus : number | undefined;

  constructor(private router: Router,
    public route:ActivatedRoute,
    public toast: ToastrService) 
    {
      this.route.queryParams
      .subscribe(params => {
        console.log('params:'+params['id']); // { orderby: "price" }
        this.getPlanId = params['id'];
        this.getPlan( this.getPlanId);
        // console.log(this.getPlanId); // price
      }
    );
      console.log("getID:"+this.getPlanId);
   }

  ngOnInit(): void {

  }

    getPlan = async (id: number) => {
    let response = await fetch("http://localhost:8080/mp/" + id);
    if(response.status == 404){
      return;
    }else{
    }
    let res = await response.json();
    console.log("get Single User:" + JSON.stringify(res));
    this.planId = res.id;
    this.planName = res.name;
    this.planValidity = res.validity;
    this.planDesc = res.description;
 
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

  
  resetData(){
    this.planId = undefined
    this.planName = '';
    this.planValidity = undefined;
    this.planDesc = '';
    this.notExist = false;
    this.respStatus == undefined;
  }

  submitPlan = async () => {

    if(this.planId == undefined || !this.planId){
      this.planIdRequired = true;
      return;
    }else if(this.planName == '' || this.planName == undefined){
      this.planNameRequired = true;
      return;
    }
    else if(this.planValidity == undefined || !this.planValidity){
      this.planValidityRequired = true;
      return;
    }
    else{
    let response2 = await fetch("http://localhost:8080/mp", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.planId.toString(),
        name: this.planName,
        validity: this.planValidity.toString(),
        description: this.planDesc,
      }),
    });

    this.respStatus = response2.status;

    if(this.respStatus == 400){
      this.notExist = true;
      return;
    }
    if(this.respStatus == 201){
     var myTimeout = setTimeout('MobilePlan', 5000);
     this.planId = undefined
     this.planName = '';
     this.planValidity = undefined;
     this.planDesc = '';
     this.notExist = false;
    }
    this.router.navigate(['./viewall']);
  }
  }
  updatePlan(){
    let response2 =  fetch("http://localhost:8080/mp", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.planId,
        name: this.planName,
        validity: this.planValidity,
        description: this.planDesc,
      }),
    });
    this.router.navigate(['./viewall']);
    
  }
}
