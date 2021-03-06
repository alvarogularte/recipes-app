import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import searchAPIFromSearch from '../services';

function SearchBar() {
  const { searchBarValue, setSearchBarValue, setRecipes } = useContext(MyContext);
  const handleChange = ({ target: { name, value } }) => (
    setSearchBarValue({ ...searchBarValue, [name]: value })
  );

  const handleClick = async () => {
    const { meals, drinks } = await searchAPIFromSearch(
      searchBarValue['search-bar-option'],
      searchBarValue['search-bar-value'], searchBarValue.page,
    );
    if (!meals && !drinks) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    return (meals ? setRecipes(meals) : setRecipes(drinks));
  };

  return (
    <div>
      <div onChange={ handleChange }>
        <input
          type="radio"
          value="Ingrediente"
          name="search-bar-option"
          data-testid="ingredient-search-radio"
        />
        {' '}
        Ingrediente
        <input
          type="radio"
          value="Nome"
          name="search-bar-option"
          data-testid="name-search-radio"
        />
        {' '}
        Nome
        <input
          type="radio"
          value="Primeira letra"
          name="search-bar-option"
          data-testid="first-letter-search-radio"
        />
        {' '}
        Primeira letra
      </div>
      <input
        type="text"
        onChange={ handleChange }
        name="search-bar-value"
        data-testid="search-input"
      />
      <button
        type="button"
        onClick={ handleClick }
        data-testid="exec-search-btn"
      >
        Buscar

      </button>
    </div>
  );
}

export default SearchBar;
