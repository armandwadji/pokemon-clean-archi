import {Component, input, InputSignal} from '@angular/core';
import {LoaderComponent} from '../../../shared/component/loader/loader.component';
import {PokemonFormComponent} from '../../../shared/component/pokemon-form/pokemon-form.component';
import {Pokemon} from '@pokemon/domain';
import {TYPE_FORM, TypeFormEnum} from '../../../shared/model/enum/type-form.enum';

@Component({
  selector: 'app-edit',
  imports: [LoaderComponent, PokemonFormComponent],
  templateUrl: './edit.component.html',
  providers:[{provide: TYPE_FORM, useValue : TypeFormEnum.EDIT}]
})
export class EditComponent {
  pokemon: InputSignal<Pokemon> = input.required();
}
