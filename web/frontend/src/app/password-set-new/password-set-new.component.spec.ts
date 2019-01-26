import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSetNewComponent } from './password-set-new.component';

describe('PasswordSetNewComponent', () => {
  let component: PasswordSetNewComponent;
  let fixture: ComponentFixture<PasswordSetNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordSetNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
