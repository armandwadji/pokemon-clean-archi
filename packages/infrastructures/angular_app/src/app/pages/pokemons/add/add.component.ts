import {Component, OnInit} from '@angular/core';
import {PokemonFormComponent} from '../../../shared/component/pokemon-form/pokemon-form.component';
import {Pokemon} from '@pokemon/domain';
import {Builder} from 'builder-pattern';
import {TYPE_FORM, TypeFormEnum} from '../../../shared/model/enum/type-form.enum';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [PokemonFormComponent],
  templateUrl: './add.component.html',
  providers:[{provide: TYPE_FORM, useValue : TypeFormEnum.CREATE}]
})
export class AddComponent implements OnInit {
  pokemon: Pokemon;

  ngOnInit(): void {
    this.pokemon = Builder<Pokemon>()
      .name("Nom")
      .hp(100)
      .cp(10)
      .created(new Date())
      .types(['Normal'])
      .picture("https://assets.pokemon.com/assets/cms2/img/pokedex/detail/123.png")
      .build();
  }
}
