import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewResultsPage } from './view-results.page';

describe('ViewResultsPage', () => {
  let component: ViewResultsPage;
  let fixture: ComponentFixture<ViewResultsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
