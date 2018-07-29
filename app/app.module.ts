import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ProductTableComponent } from './product-table/product-table.component';
import { ProductDataService } from './product-data.service';
import { ApiService } from './api.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductDeleteDialogComponent } from './product-delete-dialog/product-delete-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatListModule,
   MatTableModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
   MatInputModule,
  MatSnackBarModule,
   MatPaginatorModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatGridListModule,
   MatToolbarModule,
   MatIconModule,
   MatButtonModule,
   MatSortModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatRippleModule,
   MatDialogModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    ProductDialogComponent,
    ProductDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
      FormsModule,
      MatListModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      MatOptionModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatSnackBarModule,
      MatGridListModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatRadioModule,
      MatCheckboxModule,
      MatCardModule,
      MatProgressSpinnerModule,
      MatRippleModule,
      MatDialogModule
  ],
  entryComponents: [ProductDeleteDialogComponent, ProductDialogComponent],
  providers: [
    ProductDataService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
