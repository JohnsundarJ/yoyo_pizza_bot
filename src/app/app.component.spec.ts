import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'contactbot'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('contactbot');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to contactbot!');
  });
});


// <!DOCTYPE html>
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1">



// </head>
// <body style="text-align:center">

// <h2>Popup</h2>

// <div class="popup" onclick="myFunction('1')">Click me to toggle the popup!
// <div class="popup" onclick="myFunction('2')">Click me to toggle the popup!
//   <span class="popuptext" id="1" style="display:none">A Simple Popup!</span>
//     <span class="popuptext" id="2" style="display:none">A Simple Popup1!</span>
// </div>

// <script>
// // When the user clicks on div, open the popup
// function myFunction(x) {

//   var popup = document.getElementById(x);
//   popup.style.display="block"
// }
// </script>

// </body>
// </html>
