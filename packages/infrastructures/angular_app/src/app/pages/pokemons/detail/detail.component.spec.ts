import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailComponent} from './detail.component';
import {Pokemon} from '@pokemon/domain';
import {DeletePokemonController} from '@pokemon/web-adapters';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let deletePokemonControllerMock: jest.Mocked<DeletePokemonController>;

  beforeEach(async () => {

    deletePokemonControllerMock = {
      delete: jest.fn().mockResolvedValue(undefined),
    } as any

    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers:[
        { provide: DeletePokemonController, useValue: deletePokemonControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pokemon', {} as Pokemon)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
