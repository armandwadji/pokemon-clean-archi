import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddComponent} from './add.component';
import {PokemonFormComponent} from '../../../shared/component/pokemon-form/pokemon-form.component';
import {AddedPokemonController, EditPokemonController} from '@pokemon/web-adapters';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
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
      imports: [AddComponent],
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

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
