import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,
  MatSidenavModule, MatProgressBarModule, MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    MatTabsModule,
    MatSnackBarModule,
    MatProgressBarModule,
  CommonModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatSidenavModule
  ],
  exports: [
    MatTabsModule,
    MatSnackBarModule,
    MatProgressBarModule,
  CommonModule,
   MatToolbarModule,
   MatButtonModule,
   MatCardModule,
   MatInputModule,
   MatDialogModule,
   MatTableModule,
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatListModule,
   MatSidenavModule
   ],
})
export class CustomMaterialModule { }
