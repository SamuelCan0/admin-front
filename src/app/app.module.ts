import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { InicioComponent } from './components/inicio/inicio.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { OperacionesGComponent } from './components/operaciones-g/operaciones-g.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NotifierModule } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    OperacionesComponent,
    OperacionesGComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    NotifierModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide:LocationStrategy,useClass:HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
