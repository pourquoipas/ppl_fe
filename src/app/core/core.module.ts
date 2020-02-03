import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Core
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MenuService } from './services/menu.service';

// Shared
import { SharedModule } from '../shared/shared.module';
import { ApiUtilService } from './services/api-util.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MsgService } from './services/msg.service';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { BaseModule } from '../modules/base/base.module';
// import { OverlayPanelComponent } from './components/overlay-panel/overlay-panel.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    MenuItemComponent,
//    OverlayPanelComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
	TranslateModule,
	
	// TODO vedere come risolvere, devo importare i modules delle pick.
	BaseModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
//	OverlayPanelComponent,
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        MsgService,
        ApiUtilService,
        MenuService
      ]
    };
  }

// TODO Credo non serva ad una fava...
  static forChild(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
      ]
    };
  }  

}
