import {Component, input, InputSignal} from '@angular/core';
import {LoaderComponent} from '../../../shared/component/loader/loader.component';
import {PokemonFormComponent} from '../../../shared/component/pokemon-form/pokemon-form.component';
import {Pokemon} from '@pokemon/domain';

@Component({
  selector: 'app-edit',
  imports: [LoaderComponent, PokemonFormComponent],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  pokemon: InputSignal<Pokemon> = input.required();
}
