import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {

    const {heroeId} = useParams();
    const navigate = useNavigate();

    const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

    const handleReturn = () => {
        navigate(-1);
    }
    
    if(!hero) {
        return <Navigate to='/' />
    }

    const imagePath = `/assets/${hero.id}.jpg`;

    return (
        <div className='row mt-5'>
            <div className='col-4'>
                <img 
                    src={imagePath} 
                    alt={hero.superhero} 
                    className='img-thumbnail animate__animated animate__fadeInLeft' 
                />
            </div>

            <div className='col-8 animate__animated animate__fadeInRight'>
                <h3>{hero.superhero}</h3>
                <ul className='list-group list-group'>
                    <li className='list-group-item'>
                        <b>Alter ego: {hero.alter_ego}</b>
                    </li>
                    <li className='list-group-item'>
                        <b>Publisher: {hero.publisher}</b>
                    </li>
                    <li className='list-group-item'>
                        <b>First appearance: {hero.first_appearance}</b>
                    </li>
                </ul>

                <h5 className='mt-3'>Characters</h5>
                <p>{hero.characters}</p>
                <button
                    className='btn btn-outline-info'
                    onClick={handleReturn}
                >
                    Return 
                </button>

            </div>
            
        </div>
    )
}
