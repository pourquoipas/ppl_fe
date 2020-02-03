import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AdminModule } from './modules/admin/admin.module';
import { DemoModule } from './modules/demo/demo.module';
import { SharedModule } from './shared/shared.module';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ConfigService } from './core/configuration/config.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/reducers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StatiPickComponent } from './modules/base/pages/stato/stati-pick.component';
import { BaseModule } from './modules/base/base.module';

function load(configService: ConfigService): (() => Promise<any>) {
  return (): Promise<any> => configService.configure();
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    // Core & Shared
    SharedModule,
    CoreModule.forRoot(),
    // Modules
    AdminModule,
	DemoModule,
	StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
  ],
  providers: [{
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [
        ConfigService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    CoreModule,
  ]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
