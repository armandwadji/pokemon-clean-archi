import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

const PageNotFound: FunctionComponent = () => {
  return (
    <div className='center'>
      <img src='http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png' alt='PageTitleWrapper non trouvée' />
      <h1>Hey, cette page n'existe pas !</h1>

      <Link to='/' className='waves-effect waves-teal btn-flat'>
        Retourner au login
      </Link>
    </div>
  );
};

export default PageNotFound;
