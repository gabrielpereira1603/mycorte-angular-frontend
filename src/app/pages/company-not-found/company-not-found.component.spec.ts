import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNotFoundComponent } from './company-not-found.component';

describe('CompanyNotFoundComponent', () => {
  let component: CompanyNotFoundComponent;
  let fixture: ComponentFixture<CompanyNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
