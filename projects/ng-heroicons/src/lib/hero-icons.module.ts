import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { IconComponent } from './components/icon/icon.component';
import { ICON_SET_TOKEN } from './tokens/icon-set.token';

@NgModule({
  declarations: [
    IconComponent
  ],
  exports: [
    IconComponent
  ]
})
export class HeroIconsModule {

  constructor(@Inject(ICON_SET_TOKEN) @Optional() icons: any) {
    // if there are no icons defined then the user has likely forgotten to use the
    // `withIcons` static function when importing
    if (!icons) {
      console.warn('No icons have been included. Import NgHeroIconsModule.withIcons({ ... }) to include some icons.');
    }
  }

  /**
   * Define the icons that you wish to include in the application.
   * Each module can choose which icons to include to improve
   * tree-shakability
   * @param icons The list of icons to include
   */
  static withIcons(icons: Record<string, string>): ModuleWithProviders<HeroIconsModule> {
    return {
      ngModule: HeroIconsModule,
      providers: [
        { provide: ICON_SET_TOKEN, useValue: icons, multi: true }
      ]
    };
  }
}
