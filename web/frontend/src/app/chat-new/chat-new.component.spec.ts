import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNewComponent } from './chat-new.component';

describe('ChatNewComponent', () => {
  let component: ChatNewComponent;
  let fixture: ComponentFixture<ChatNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
