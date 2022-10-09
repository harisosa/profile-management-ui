import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from 'src/app/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/component/modal/modal.module';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    ProfileRoutingModule,
    ModalModule
  ],
  providers:[UserService],
  exports : [ProfileComponent]
})
export class ProfileModule { }
