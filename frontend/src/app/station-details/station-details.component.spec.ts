import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDetailsComponent } from './station-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StationDetailsComponent', () => {
  let component: StationDetailsComponent;
  let fixture: ComponentFixture<StationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StationDetailsComponent],
    });
    fixture = TestBed.createComponent(StationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
