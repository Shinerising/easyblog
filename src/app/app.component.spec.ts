import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ConfigService } from './service/config.service';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ConfigService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have header`, () => {
    const config = TestBed.get(ConfigService);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.header).toEqual(config.Title);
  });

  it(`should have url`, () => {
    const config = TestBed.get(ConfigService);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.url).toEqual(config.getRepoURL());
  });

  it('should render title in a h1 tag', () => {
    const config = TestBed.get(ConfigService);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(config.Title);
  });

  it('should add custom stylesheet', () => {
    const config = TestBed.get(ConfigService);
    config.Theme = 'dark';
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const document = fixture.debugElement.componentInstance.document;
    expect(document.querySelector('link:last-child').getAttribute('href')).toContain(config.Theme);
  });
});
