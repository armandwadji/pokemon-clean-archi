import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { Pokemon } from '@pokemon/domain';
import { DeletePokemonController } from '@pokemon/web-adapters';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { routesName } from '../../../app-routing-config';
import { of } from 'rxjs';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let deletePokemonControllerMock: jest.Mocked<DeletePokemonController>;
  let routerMock: jest.Mocked<Router>;
  const pokemonMock: Pokemon = { id: '1', name: 'Pikachu' } as Pokemon;

  beforeEach(async () => {
    deletePokemonControllerMock = {
      delete: jest.fn().mockReturnValue(of(undefined)),
    } as any;

    routerMock = {
      navigate: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        {
          provide: DeletePokemonController,
          useValue: deletePokemonControllerMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pokemon', pokemonMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to Pokemon list on goToPokemonList', () => {
    const previousButton = fixture.debugElement.query(
      By.css('#previous-button'),
    );

    previousButton.triggerEventHandler('click');

    expect(routerMock.navigate).toHaveBeenCalledWith([routesName.pokemon.path]);
  });

  it('should navigate to edit Pokemon on goToEditPokemon', () => {
    const editButton = fixture.debugElement.query(By.css('#edit-button'));

    editButton.triggerEventHandler('click');

    expect(routerMock.navigate).toHaveBeenCalledWith([
      routesName.pokemon.children.editing.fullPath,
      pokemonMock.id,
    ]);
  });

  it('should delete Pokemon on deletePokemon', () => {
    const deleteButton = fixture.debugElement.query(By.css('#delete-button'));

    deleteButton.triggerEventHandler('click');

    expect(deletePokemonControllerMock.delete).toHaveBeenCalledWith(
      pokemonMock.id,
    );
    expect(routerMock.navigate).toHaveBeenCalledWith([routesName.pokemon.path]);
  });
});
