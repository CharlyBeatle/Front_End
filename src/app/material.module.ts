import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [CommonModule,MatFormFieldModule ,
        MatSidenavModule,
        MatMenuModule,
        MatInputModule,
            MatIconModule,
            MatButtonModule],
    exports: [MatSidenavModule,
        MatMenuModule,
        MatInputModule,
            MatIconModule,
            MatButtonModule]
})
export class MaterialModule { }
