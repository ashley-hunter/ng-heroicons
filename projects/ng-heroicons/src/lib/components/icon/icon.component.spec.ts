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

  it('should show the correct icon', () => {
    component.name = 'annotation';
    component.ngOnChanges();

    const svg = fixture.nativeElement.querySelector('svg');

    expect(svg.outerHTML).toBe(annotation);
  });

  it('should allow the icon to be change', () => {
    component.name = 'annotation';
    component.ngOnChanges();

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.outerHTML).toBe(annotation);

    component.name = 'printer';
    component.ngOnChanges();

    expect(svg.outerHTML).toBe(printer);
  });

  it('should allow the size to be set', () => {
    component.name = 'printer';
    component.size = '1.5rem';
    fixture.detectChanges();

    expect(fixture.nativeElement.style.width).toBe('1.5rem');
    expect(fixture.nativeElement.style.height).toBe('1.5rem');
  });
});
