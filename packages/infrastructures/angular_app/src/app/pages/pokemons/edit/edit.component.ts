import {Component, input, InputSignal} from '@angular/core';
import {LoaderComponent} from '../../../shared/component/loader/loader.component';
import {PokemonFormComponent} from '../../../shared/component/pokemon-form/pokemon-form.component';
import {Pokemon} from '@pokemon/domain';
import {TypeFormEnum} from '../../../shared/model/enum/type-form.enum';
import {typeFormEnumToken} from '../../../shared/tokens/type-form.token';
import {TranslatePipe} from '../../../shared/pipe/translate/translate.pipe';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [LoaderComponent, PokemonFormComponent, TranslatePipe, TitleCasePipe],
  templateUrl: './edit.component.html',
  providers:[{provide: typeFormEnumToken, useValue : TypeFormEnum.EDIT}]
})
export class EditComponent {
  pokemon: InputSignal<Pokemon> = input.required();
}
