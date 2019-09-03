import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DetailComponent } from './detail.component';

import { CoreModule } from './../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { DetailRoutingModule } from './detail-routing.module';

import { Animal } from '../../model/animal/animal.model';

import { AnimalDetailResolver } from '../../resolver/animal-detail-resolver/animal-detail.resolver';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [
        RouterTestingModule,
        DetailRoutingModule,
        SharedModule,
        CoreModule
      ],
      providers: [{
        provide: AnimalDetailResolver,
        useValue: {
          snapshot: {
            data: {
              animal: new Animal(null)
            }
          }
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
