import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { HeroIconName } from '../../icons/icons';
import { ICON_SET_TOKEN } from '../../tokens/icon-set.token';
import { camelize } from '../../utilities/camelize';

@Component({
  selector: 'hero-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'size',
    '[style.height]': 'size',
  },
})
export class IconComponent implements OnChanges {
  /** Define the name of the icon to display */
  @Input() name: HeroIconName | undefined;

  /** Define the size of the icon */
  @Input() size: string = '1em';

  /**
   * Store the icons in a flattened object. The will be injected as any array of objects
   * due to the provider using `multi`.
   */
  private readonly icons: Readonly<Record<string, string>> = {};

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    // tslint:disable-next-line:no-any
    @Inject(ICON_SET_TOKEN) iconsets: any
  ) {
    // cast the injected values
    const iconsetGroups = iconsets as ReadonlyArray<Record<string, string>>;

    // flatter the array into an object
    this.icons = iconsetGroups.reduce((icons, iconset) => ({
      ...icons,
      ...iconset,
    }));
  }

  ngOnChanges(): void {
    // convert a hyphenated name into a camel case name
    const name = camelize(this.name);

    // if there is no icon with this name warn the user as they probably forgot to import it
    if (!this.icons.hasOwnProperty(name)) {
      return console.warn(
        `No icon named ${name} was found. You may need to import it using the withIcons function.`
      );
    }

    // insert the SVG into the template
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.icons[name]
    );
  }
}
