import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { MainService } from './services/main.service';

import { DamComponent } from './components/dam/dam.component';
import { DynFormModule } from './components/dyn-form/dyn-form.module';
import { SearchComponent } from './components/search/search.component';
import { AssetsModalComponent } from './components/modals/assets-modal/assets-modal.component';
import { TableComponent } from './components/table/table.component';
import { TableSearchComponent } from './components/table/table-search/table-search.component';
import { TableItemComponent } from './components/table/table-item/table-item.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FacetsComponent } from './components/facets/facets.component';
import { FacetComponent } from './components/facets/facet/facet.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab.component';
import { DynTabformComponent } from './components/dyn-tabform/dyn-tabform.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    DynFormModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    MainService,
    NgxSmartModalService
  ],
  declarations: [
    DamComponent,
    SearchComponent,
    TableComponent,
    TableSearchComponent,
    TableItemComponent,
    AssetsModalComponent,
    FacetsComponent,
    FacetComponent,
    LoadingComponent,
    TabsComponent,
    TabComponent,
    DynTabformComponent
  ],
  exports: [
    DamComponent
  ]
})
export class XDamModule { }
