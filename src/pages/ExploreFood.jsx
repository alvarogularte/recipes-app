import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreFood() {
  return (
    <div>
      <Header title="Explorar Comidas" enable={ false } />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            name="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            name="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to="/explorar/comidas/surpreenda">
          <button
            type="button"
            data-testid="explore-surprise"
            name="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
