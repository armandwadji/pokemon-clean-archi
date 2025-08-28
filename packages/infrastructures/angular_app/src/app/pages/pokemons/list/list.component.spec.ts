import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { GetPokemonsController } from '@pokemon/web-adapters';
import { Pokemon } from '@pokemon/domain';
import { routesName } from '../../../app-routing-config';
import { Router } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockController: jest.Mocked<GetPokemonsController>;
  let routerSpy: jest.Mocked<Router>;

  beforeEach(async () => {
    mockController = {
      getPokemons: jest
        .fn()
        .mockResolvedValue([
          { pokemon: { id: '1', name: 'Pikachu' } as Pokemon },
        ]),
      searchPokemonsByName: jest.fn(),
    } as any;

    routerSpy = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: GetPokemonsController, useValue: mockController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to pokemon detail', () => {
    const pokemon = { id: '1', name: 'Pikachu' } as Pokemon;
    component.goToPokemon(pokemon);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      routesName.pokemon.children.detail.fullPath,
      pokemon.id,
    ]);
  });

  it('should navigate to add pokemon', () => {
    const addButton = fixture.nativeElement.querySelector('#add-button');

    addButton.click();

    expect(routerSpy.navigate).toHaveBeenCalledWith([
      routesName.pokemon.children.add.fullPath,
    ]);
  });
});
