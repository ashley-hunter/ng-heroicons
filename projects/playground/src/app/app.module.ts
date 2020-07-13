import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { annotation, annotationSolid, HeroIconsModule } from 'ng-heroicons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeroIconsModule.withIcons({ annotation, annotationSolid })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
