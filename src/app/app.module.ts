import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ViewallComponent } from './viewall/viewall.component';
import { CreateplanComponent } from './createplan/createplan.component';
import { RedirectComponent } from './redirect/redirect.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdatePlanComponent } from './update-plan/update-plan.component';
import { DeleteComponent } from './delete/delete.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CreatedialogeComponent } from './createdialoge/createdialoge.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmlogoutComponent } from './confirmlogout/confirmlogout.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ViewallComponent,
    CreateplanComponent,
    RedirectComponent,
    AboutusComponent,
    UpdatePlanComponent,
    DeleteComponent,
    CreatedialogeComponent,
    ConfirmlogoutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
}),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
