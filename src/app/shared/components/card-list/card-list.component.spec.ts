import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CardListComponent } from './card-list.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { UtilityService } from '../../../core/utility/utility.service';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardListComponent],
      imports: [
        RouterTestingModule,
        LazyLoadImageModule
      ],
      providers: [
        UtilityService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
