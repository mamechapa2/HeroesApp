import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import queryString from 'query-string';

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {q = ''} = queryString.parse(location.search);
    //console.log(q);

    const [{searchText}, handleInputChange, reset] = useForm({
        searchText: q
    });

    const heroesFiltered = useMemo(() => getHeroesByName(searchText), [searchText]);

    const handleSearch = (e) => {
        e.preventDefault();

        //if(searchText.trim() === '') return;
        
        //console.log(searchText);

        navigate(`?q=${searchText}`);
    }
    return (
        <>
            <h1>Search Heroes</h1>
            <hr />

            <div className="row">
                <div className="col-5 animate__animated animate__fadeInLeft">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Heroe name"
                            name="searchText"
                            autoComplete='off'
                            onChange={handleInputChange}
                            value={searchText}
                        />

                    

                        <button 
                            type='submit'
                            className='btn btn-outline-primary mt-3'
                        >
                            Search
                        </button>

                        {/* {
                            (q === '') && 
                                <div className="alert alert-info">Search a heroe</div>
                        } */}
                    </form>
                </div>

                <div className="col-7 animate__animated animate__fadeInRight">
                    <h4>Result</h4>
                    <hr />
                    {
                        heroesFiltered.length === 0
                        ?
                            <div className="alert alert-danger animate__animated animate__fadeInRight">
                                <h5 className="text-center">No results</h5>
                            </div>
                        :
                            heroesFiltered.map(hero => (
                                <HeroCard 
                                    key={hero.id}
                                    {...hero}
                                />
                            ))
                    }
                </div>
            
            </div>
        </>
    )
}
