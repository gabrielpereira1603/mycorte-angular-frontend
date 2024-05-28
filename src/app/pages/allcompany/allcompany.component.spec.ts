import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcompanyComponent } from './allcompany.component';

describe('AllcompanyComponent', () => {
  let component: AllcompanyComponent;
  let fixture: ComponentFixture<AllcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllcompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
