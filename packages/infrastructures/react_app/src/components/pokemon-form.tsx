import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {NavigateFunction, useNavigate} from "react-router";
import {formatType} from "../utils/formatType";
import {PokemonRequest} from "@pokemon/domain";
import {PokemonsPresenterVM} from "@pokemon/web-adapters";
import {DataProviderContext, dataProviderContextType} from "../context/DataProviderContext";
import {routesName} from "../utils/routing.config";

interface Props {
    id: string | undefined;
    pokemon: PokemonRequest;
}

interface Field {
    value?: any;
    error?: string;
    isValid?: boolean;
}

interface Form {
    picture: Field;
    name: Field;
    hp: Field;
    cp: Field;
    types: Field;
}

const PokemonForm: FunctionComponent<Props> = ({id, pokemon}) => {
    const {getPokemonsController, updatePokemonController, addPokemonController, deletePokemonController} = useContext( DataProviderContext) as dataProviderContextType;

    //On définit tous les types de pokémons
    const [types, setTypes] = useState<string[]>([]);

    useEffect(() => {
        getPokemonsController.getPokemons().then((pokemonPresenter: PokemonsPresenterVM) => setTypes(pokemonPresenter.pokemonTypes ?? []));
    }, [getPokemonsController]);

    //On définit la variable isAddForm qui nous permettra de savoir si nous sommes en mode création de pokémon
    const isAddForm = !id;

    //On définit le hook qui va contenir les différentes informations du Pokémon à éditer: name, hp, cp et types.
    const [form, setForm] = useState<Form>({
        name: {value: pokemon.name, isValid: true},
        hp: {value: pokemon.hp, isValid: true},
        cp: {value: pokemon.cp, isValid: true},
        types: {value: pokemon.types, isValid: true},
        picture: {value: pokemon.picture, isValid: true},
    });

    const navigate: NavigateFunction = useNavigate(); //Méthode qui redirige ver la page à déclarer

    /**
     * Fonction qui checked les inputs dont le type figure dans les caractéristiques du pokémon à éditer
     * @param type type de pokémon
     */
    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    };

    /**
     * Méthode qui update le formulaire à chaque changement effectuer par l'utilisateur
     * @param e événement
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = {[fieldName]: {value: fieldValue}};

        //Spread Operator pour actualiser le formulaire
        setForm({...form, ...newField});
    };

    /**
     * Méthode pour update les types de pokémons
     * @param type type de pokémon
     * @param e événement
     */
    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        const checked: boolean = e.target.checked;
        let newField: Field;

        if (checked) {
            const newTypes: string[] = form.types.value.concat([type]);
            newField = {value: newTypes};
        } else {
            const newTypes: string[] = form.types.value.filter(
                (currentType: string) => currentType !== type
            );
            newField = {value: newTypes};
        }

        setForm({...form, ...{types: newField}});
    };

    /**
     * Méthode de validité pour les types
     * @param type type de pokémon
     */
    const isTypesValid = (type: string): boolean => {
        if (form.types.value.length === 1 && hasType(type)) {
            return false;
        }

        return !(form.types.value.length >= 3 && !hasType(type));
    };

    /**
     * Méthode qui CREATE un pokémon
     * @param pokemon
     */
    const addPokemon = (pokemon: PokemonRequest): void => {
        addPokemonController.create(pokemon).then(() => navigate(`/${routesName.pokemon.path}`));
    };

    /**
     * Méthode qui UPDATE un pokémon
     * @param pokemon
     */
    const updatePokemon = (pokemon: PokemonRequest): void => {
        updatePokemonController.update(id as string, pokemon).then(() => navigate(`/${routesName.pokemon.children.detail.fullPath}/${id}`));
    };

    /**
     * Méthode qui DELETE un pokémon
     */
    const deletePokemon = (): void => {
        deletePokemonController.delete(id as string).then(() => navigate(`/${routesName.pokemon.path}`));
    };

    /**
     * Méthode pour vérifier la validité des informations du formulaire (expressions régulières — regex)
     */
    const validateForm = async (): Promise<boolean> => {
        let newForm: Form = form;

        const [pictureError, nameError, hpError, cpError]: (string | undefined)[] = await Promise.all([
            updatePokemonController.validatePicture(form.picture.value),
            updatePokemonController.validateName(form.name.value),
            updatePokemonController.validateHp(form.hp.value),
            updatePokemonController.validateCp(form.cp.value)
        ]);

        //Validator picture
        if (isAddForm) {
            const pictureField: Field = {
                value: form.picture.value,
                error: pictureError,
                isValid: !pictureError,
            };
            newForm = {...form, ...{picture: pictureField}};
        }

        // Validator name
        const nameField: Field = {
            value: form.name.value,
            error: nameError,
            isValid: !nameError,
        };
        newForm = {...newForm, ...{name: nameField}};

        // Validator hp
        const hpField: Field = {
            value: form.hp.value,
            error: hpError,
            isValid: !hpError,
        };
        newForm = {...newForm, ...{hp: hpField}};

        // Validator cp
        const cpField: Field = {
            value: form.hp.value,
            error: cpError,
            isValid: !cpError,
        };
        newForm = {...newForm, ...{cp: cpField}};

        setForm(newForm);

        return Boolean(
            newForm.name.isValid &&
            newForm.hp.isValid &&
            newForm.cp.isValid &&
            newForm.picture.isValid
        );
    };

    /**
     * Méthode pour gérer la soumission de notre formulaire
     * @param e événement
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid: boolean = await validateForm();

        if (isFormValid) {
            //On actualise les paramètres du pokémon
            pokemon.name = form.name.value;
            pokemon.hp = form.hp.value;
            pokemon.cp = form.cp.value;
            pokemon.types = form.types.value;

            if (isAddForm){
                pokemon.picture = form.picture.value;
                addPokemon(pokemon)
            } else {
                updatePokemon(pokemon);
            }
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='row'>
                <div className='col s12 m8 offset-m2'>
                    <div className='card hoverable'>
                        {/* L'image ne s'affiche que si nous sommes en mode édition d'un pokémon */}
                        {!isAddForm && (
                            <div className='card-image'>
                                <img src={pokemon.picture} alt={pokemon.name}
                                     style={{width: "250px", margin: "0 auto"}}/>
                                <span className='btn-floating halfway-fab waves-effect waves-light'>
                  <i onClick={deletePokemon} className='material-icons'>
                    delete
                  </i>
                </span>
                            </div>
                        )}

                        <div className='card-stacked'>
                            <div className='card-content'>
                                {/* Pokemon picture */}
                                {isAddForm && (
                                    <div className='form-group'>
                                        <label htmlFor='picture'>Image</label>
                                        <input id='picture' type='text' className='form-control'
                                               defaultValue={form.picture.value} name='picture'
                                               onChange={(e) => handleInputChange(e)}></input>
                                        {/* Error picture */}
                                        {form.picture.error && (
                                            <div className='card-panel red accent-1' dangerouslySetInnerHTML={{ __html: form.picture.error }}>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Pokemon name */}
                                <div className='form-group'>
                                    <label htmlFor='name'>Nom</label>
                                    <input id='name' type='text' className='form-control' defaultValue={form.name.value}
                                           name='name' onChange={(e) => handleInputChange(e)}></input>
                                    {/* Error name */}
                                    {form.name.error && (
                                        <div className='card-panel red accent-1'>
                                            {form.name.error}
                                        </div>
                                    )}
                                </div>

                                {/* Pokemon hp */}
                                <div className='form-group'>
                                    <label htmlFor='hp'>Point de vie</label>
                                    <input id='hp' type='number' className='form-control' defaultValue={form.hp.value}
                                           name='hp' onChange={(e) => handleInputChange(e)}></input>
                                    {/* Error hp */}
                                    {form.hp.error && (
                                        <div className='card-panel red accent-1'>
                                            {form.hp.error}
                                        </div>
                                    )}
                                </div>

                                {/* Pokemon cp */}
                                <div className='form-group'>
                                    <label htmlFor='cp'>Dégâts</label>
                                    <input id='cp' type='number' className='form-control' defaultValue={form.cp.value}
                                           name='cp' onChange={(e) => handleInputChange(e)}></input>
                                    {/* Error cp */}
                                    {form.cp.error && (
                                        <div className='card-panel red accent-1'>
                                            {form.cp.error}
                                        </div>
                                    )}
                                </div>

                                {/* Pokemon types */}
                                <div className='form-group'>
                                    <label>Types</label>
                                    {types.map((type) => (
                                        <div key={type} style={{marginBottom: "10px"}}>
                                            <label>
                                                <input id={type} type='checkbox' className='filled-in'
                                                       defaultValue={type} defaultChecked={hasType(type)}
                                                       onChange={(e) => selectType(type, e)}
                                                       disabled={!isTypesValid(type)}></input>
                                                <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit button */}
                            <div className='card-action center'>
                                <button type='submit' className='btn'> Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PokemonForm;
