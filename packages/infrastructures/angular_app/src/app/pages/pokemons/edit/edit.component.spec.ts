import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {Pokemon} from '@pokemon/domain';
import {PokemonFormComponent} from '../../../shared/component/pokemon-form/pokemon-form.component';
import {AddedPokemonController, EditPokemonController} from '@pokemon/web-adapters';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
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
    })
      .overrideComponent(PokemonFormComponent, {
        set: {
          selector: 'app-pokemon-form',
          template: '<div>Mocked Pokemon Form</div>',
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', {} as Pokemon)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
