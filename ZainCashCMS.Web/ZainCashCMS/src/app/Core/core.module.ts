import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterPageComponent } from './master-page/master-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenubarModule
  ],
  declarations: [LoginComponent, MasterPageComponent],
  exports: [LoginComponent, MasterPageComponent],
  providers: []

})
export class CoreModule { }
