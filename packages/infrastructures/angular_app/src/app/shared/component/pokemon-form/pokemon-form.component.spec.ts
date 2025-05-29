import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddedPokemonController, EditPokemonController} from '@pokemon/web-adapters';
import {PokemonFormComponent} from './pokemon-form.component';
import {EditComponent} from '../../../pages/pokemons/edit/edit.component';
import {Pokemon} from '@pokemon/domain';

describe("PokemonFormComponent", () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;
  let addPokemonControllerMock: jest.Mocked<AddedPokemonController>;
  let editPokemonControllerMock: jest.Mocked<EditPokemonController>;

  beforeEach(async () => {
    addPokemonControllerMock = {
      create: jest.fn(),
      validate: jest.fn(),
    } as any;

    editPokemonControllerMock = {
      update: jest.fn(),
      validate: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [EditComponent, PokemonFormComponent],
      providers: [
        { provide: AddedPokemonController, useValue: addPokemonControllerMock },
        { provide: EditPokemonController, useValue: editPokemonControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', {} as Pokemon)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
