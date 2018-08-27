import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DynFormModule } from './dyn-form/dyn-form.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { FiltersModule } from './filters/filters.module';
import { AssetsManagerComponent } from './main/assets-manager/assets-manager.component';
import { TableComponent } from './main/table/table.component';
import { TableSearchComponent } from './main/table/table-search/table-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableItemComponent } from './main/table/table-item/table-item.component';
import { TablePaginatorComponent } from './main/table/table-paginator/table-paginator.component';
import { HttpClientModule } from '@angular/common/http';
import { MainService } from './services/main.service';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { AssetsModalComponent } from './modals/assets-modal/assets-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    SearchComponent,
    AssetsManagerComponent,
    TableComponent,
    TableSearchComponent,
    TableItemComponent,
    TablePaginatorComponent,
    AssetsModalComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FiltersModule,
    HttpClientModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    DynFormModule,
    ReactiveFormsModule
  ],
  providers: [MainService, NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
