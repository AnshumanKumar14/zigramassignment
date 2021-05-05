import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ColumnSortPipe } from './columnSort.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent, ColumnSortPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
