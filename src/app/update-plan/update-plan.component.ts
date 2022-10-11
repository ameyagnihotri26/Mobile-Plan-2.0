import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmlogoutComponent } from '../confirmlogout/confirmlogout.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';


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

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 1;


  notExist: boolean = false;
  planIdRequired: boolean = false;
  planNameRequired : boolean = false;
  planValidityRequired : boolean = false;
  respStatus : number | undefined;

  constructor(private router: Router,
    public route:ActivatedRoute,
    public toast: ToastrService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) 
    {
      this.route.queryParams
      .subscribe(params => {
        console.log('params:'+params['id']); // { orderby: "price" }
        this.getPlanId = params['id'];
        this.getPlan( this.getPlanId);
        // console.log(this.getPlanId); // price
      }
    );
    if(this.getPlanId == '')
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
    window.location.href = 'http://127.0.0.1:5500/templatemo_557_grad_school/ViewLogs.html';
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

  
  resetData(){
    //this.planId = undefined
    this.planName = '';
    this.planValidity = undefined;
    this.planDesc = '';
    this.notExist = false;
    this.respStatus == undefined;
    this.planIdRequired  = false;
    this.planNameRequired = false;
    this.planValidityRequired = false;
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
    this.snackBar.open('Plan Updated Successfully', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
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
