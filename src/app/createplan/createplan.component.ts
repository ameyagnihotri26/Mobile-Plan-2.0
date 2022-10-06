import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreatedialogeComponent } from '../createdialoge/createdialoge.component';

@Component({
  selector: 'app-createplan',
  templateUrl: './createplan.component.html',
  styleUrls: ['./createplan.component.css']
})
export class CreateplanComponent implements OnInit {

  getPlanId: any;
  planId : number | undefined ;
  planName: string = '';
  planValidity: number | undefined;
  planDesc: string = '';

  planIdRequired: boolean = false;
  planNameRequired : boolean = false;
  planValidityRequired : boolean = false;

  alreadyExist: boolean = false;
  respStatus :number | undefined ;
  toastRef: any;
  constructor(private router: Router,
    public route:ActivatedRoute,
    public toast : ToastrService,
    public spinner : NgxSpinnerService,
    public dialog: MatDialog)
     {
      
      this.route.queryParams
      .subscribe(params => {
        console.log('params:'+params['id']); // { orderby: "price" }
        this.getPlanId = params['id'];
        // this.getPlan( this.getPlanId);
        // console.log(this.getPlanId); // price
      }
    );
      console.log("getID:"+this.getPlanId);
   }

  ngOnInit(): void {
    
  //  this.toastRef = this.toast.show("Test",'Mobile',{
  //     disableTimeOut: true,
  //     tapToDismiss: false,
  //     toastClass: "toast border-red",
  //     closeButton: true,
  //     positionClass:'top-left'
  //   });
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


  submitPlan = async () => {

    // if(this.planId == undefined || !this.planId){
    //   this.planIdRequired = true;
    //   return;
    // }else 
    if(this.planName == '' || this.planName == undefined){
      this.planNameRequired = true;
      return;
    }
    else if(this.planValidity == undefined || !this.planValidity){
      this.planValidityRequired = true;
      return;
    }
    else{
      this.spinner.show();
      let response2 = await fetch("http://localhost:8080/mp", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.planName,
          validity: this.planValidity.toString(),
          description: this.planDesc,
        }),
      });
  
      this.respStatus = response2.status;
      let res = await response2.json();
      this.getPlanId = res['id'];
      this.spinner.hide();
      if(this.respStatus == 400){
        this.alreadyExist = true;
        return;
      }
      if(this.respStatus == 201){

        // const dialogRef = this.dialog.open(CreatedialogeComponent);

        const dialogRef = this.dialog.open(CreatedialogeComponent, {
          data: {
            dataKey: this.getPlanId
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });

       var myTimeout = setTimeout('MobilePlan', 5000);
       this.planId = undefined
       this.planName = '';
       this.planValidity = undefined;
       this.planDesc = '';
       this.alreadyExist = false;
      }
    
    }
  
  }

  closePopup(){
    this.respStatus = 100;
  }

  resetData(){
    this.planId = undefined
    this.planName = '';
    this.planValidity = undefined;
    this.planDesc = '';
    this.alreadyExist = false;
    this.respStatus = undefined
    this.planIdRequired  = false;
    this.planNameRequired = false;
    this.planValidityRequired = false;
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
    this.router.navigate(['./update']);
    
  }
}
