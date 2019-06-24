import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { MainService } from 'src/app/services/main.service';

import { DamComponent } from './components/dam.component';
import { DynFormModule } from './components/dyn-form/dyn-form.module';
import { SearchComponent } from './components/search/search.component';
import { AssetsModalComponent } from './components/modals/assets-modal/assets-modal.component';
import { FacetsComponent } from './components/facets/facets.component';
import { FacetComponent } from './components/facets/facet/facet.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab.component';
import { DynTabformComponent } from './components/dyn-tabform/dyn-tabform.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/list/item/item.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        HttpClientModule,
        FormsModule,
        NgxSmartModalModule.forRoot(),
        DynFormModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.circleSwish,
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.5)',
            primaryColour: '#00a397',
            secondaryColour: '#00a397',
            tertiaryColour: '#00a397'
        }),
        SweetAlert2Module.forRoot({
            customClass: {
                container: 'xdam-modal-container',
                popup: 'xdam-modal',
                header: 'xdam-modal-header',
                title: 'xdam-modal-title',
                closeButton: 'xdam-modal-close-button',
                image: 'xdam-modal-image',
                content: 'xdam-modal-content',
                input: 'xdam-input',
                actions: 'xdam-modal-actions',
                confirmButton: 'xdam-btn-base confirm',
                cancelButton: 'xdam-btn-base cancel',
                footer: 'xdam-modal-footer'
            }
        })
    ],
    providers: [MainService, NgxSmartModalService],
    declarations: [
        DamComponent,
        SearchComponent,
        AssetsModalComponent,
        FacetsComponent,
        FacetComponent,
        TabsComponent,
        TabComponent,
        DynTabformComponent,
        PaginatorComponent,
        ListComponent,
        ItemComponent,
        FooterComponent
    ],
    exports: [DamComponent]
})
export class XDamModule {}
