import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { HeroIconsModule } from '../../hero-icons.module';
import { annotation, printer } from '../../icons/icons';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeroIconsModule.withIcons({ annotation, printer })]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should show the correct icon', () => {
    component.name = 'annotation';
    component.ngOnChanges();

    const svg = fixture.nativeElement.querySelector('svg');

    expect(svg.outerHTML).toBe('<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
      '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>\n' +
      '</svg>');
  });

  xit('should allow the icon to be change', () => {
    component.name = 'annotation';
    component.ngOnChanges();

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.outerHTML).toBe('<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
      '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>\n' +
      '</svg>');

    component.name = 'printer';
    component.ngOnChanges();

    expect(svg.outerHTML).toBe('<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">\n' +
      '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>\n' +
      '</svg>');
  });

  xit('should allow the size to be set', () => {
    component.name = 'printer';
    component.size = '1.5rem';
    fixture.detectChanges();

    expect(fixture.nativeElement.style.width).toBe('1.5rem');
    expect(fixture.nativeElement.style.height).toBe('1.5rem');
  });
});
