import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import swal2 from './profiles/swal2';
import {TabsModule} from 'ngx-tabset';

import { DamComponent } from './components/dam.component';
import { SearchComponent } from './components/search/search.component';
import { FacetsComponent } from './components/facets/facets.component';
import { FacetComponent } from './components/facets/facet/facet.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/list/item/item.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { QuestionsComponent } from './components/forms/questions/questions.component';
import { TextComponent } from './components/forms/questions/text/text.component';
import { DropdownComponent } from './components/forms/questions/dropdown/dropdown.component';
import { FileComponent } from './components/forms/questions/file/file.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        HttpClientModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.circleSwish,
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.5)',
            primaryColour: '#00a397',
            secondaryColour: '#00a397',
            tertiaryColour: '#00a397'
        }),
        SweetAlert2Module.forRoot(swal2),
        TabsModule.forRoot()
    ],
    providers: [],
    declarations: [
        DamComponent,
        SearchComponent,
        FacetsComponent,
        FacetComponent,
        PaginatorComponent,
        ListComponent,
        ItemComponent,
        FooterComponent,
        ItemFormComponent,
        QuestionsComponent,
        TextComponent,
        DropdownComponent,
        FileComponent
    ],
    exports: [DamComponent]
})
export class XDamModule {}
