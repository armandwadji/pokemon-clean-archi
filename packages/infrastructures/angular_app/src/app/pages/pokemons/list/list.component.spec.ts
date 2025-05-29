import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ListComponent} from './list.component';
import {GetPokemonsController} from '@pokemon/web-adapters';
import {Pokemon} from '@pokemon/domain';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockController: jest.Mocked<GetPokemonsController>;

  beforeEach(async () => {
    mockController = {
      getPokemons: jest.fn().mockResolvedValue([
        {pokemon: { id: '1', name: 'Pikachu' } as Pokemon},
      ]),
      searchPokemonsByName: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: GetPokemonsController, useValue: mockController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
