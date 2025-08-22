import {FunctionComponent, useState} from "react";
import {formatDate} from "../utils/formatDate";
import {formatType} from "../utils/formatType";
import {NavigateFunction, useNavigate} from "react-router";
import {Pokemon} from "@pokemon/domain/src";
import {routesName} from "../utils/routing.config";

type Props = {
    pokemon: Pokemon;
    borderColor?: string;
};
const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#009688'}: Props) => {
    const {id, name, picture, types} = pokemon;

    const [color, setColor] = useState<string>();
    const navigate: NavigateFunction = useNavigate();

    /**
     * Fonction pour changer la bordure du Pokémon lors du hover de la carte.
     */
    const showBorder = () => {
        setColor(borderColor);
    };

    /**
     * Fonction pour remettre la bordure en gris lors du hover de la carte.
     */
    const hideBorder = () => {
        setColor("#f5f5f5");
    };

    /**
     * Fonction pour rediriger vers la page de détail du Pokémon.
     * @param id - L'identifiant du Pokémon.
     */
    const goToPokemon = (id: string) => {
        navigate(`/${routesName.pokemon.children.detail.fullPath}/${id}`);
    };

    return (
        <div className='col m4 s6' onClick={() => goToPokemon(id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
            <div className='card horizontal' style={{borderColor: color, height: "180px", cursor: "pointer", border: `solid 4px ${color}`}}>
                <div className='card-image'>
                    <img src={picture} alt={name}/>
                </div>
                <div className='card-stacked'>
                    <div className='card-content'>
                        <p>{name}</p>
                        <p>
                            <small> Date : {formatDate()}</small>
                        </p>
                        {types.map((type) => (
                            <span key={type} className={formatType(type)}>
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;