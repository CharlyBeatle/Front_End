import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

const modules = [CommonModule,
                MatSidenavModule,
                MatMenuModule,
                MatInputModule,
                MatIconModule,
                MatButtonModule,
                MatTableModule,
                MatPaginatorModule,
                MatSortModule,
                MatTooltipModule,
                MatDialogModule,
                MatFormFieldModule,
                MatSelectModule
            ]

@NgModule({
    imports: [modules],
    exports: [modules]
})
export class MaterialModule { }
