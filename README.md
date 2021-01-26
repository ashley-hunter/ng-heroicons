# Ng Heroicons

![CI](https://github.com/ashley-hunter/ng-heroicons/workflows/CI/badge.svg)

A set of free MIT-licensed high-quality SVG icons for you to use in your web projects.

The SVG Icons created by: https://github.com/refactoringui/heroicons

Preview and search at Heroicons.dev (Made by @codex-zaydek)

## Installing Library

```
npm i ng-heroicons
```

or

```
yarn add ng-heroicons
```

## Using Icons

Import `HeroIconsModule` from 'ng-heroicons', along with any icons you want to include.
To include icons add them to the `withIcons` function call, e.g.:

```typescript
import { annotation, annotationSolid, HeroIconsModule } from 'ng-heroicons';

@NgModule({
  declarations: [
  ],
  imports: [
    HeroIconsModule.withIcons({ annotation, annotationSolid })
  ],
})
export class AppModule {
}
```

You can import different icons in each lazy loaded module to reduce the icons loaded in each bundle.

To insert an icon use the following HTML:

```html
<hero-icon name="annotation"></hero-icon>
<hero-icon name="annotation-solid"></hero-icon>
```

Icon names are in kebab-case format. If an icon doesn't appear it is likely you forgot to import it.

By default, the size of the icon uses the font size and text color. There is a `size` input which allows
you to define any CSS value for the icon size. 

#### Outline style

24x24 icons drawn with a stroke.

![](https://github.com/refactoringui/heroicons/raw/master/.github/outline-preview.svg?sanitize=true)

#### Solid style

Smaller 20x20 icons drawn with fills.

![](https://github.com/refactoringui/heroicons/raw/master/.github/solid-preview.svg?sanitize=true)
