import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {heroesFetch, heroDelete, filterHeroesSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {


    const filteredHeroes = useSelector(filterHeroesSelector);
    // console.log(filteredHeroes);
    const {heroesLoadingStatus} = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetch());
               // eslint-disable-next-line
    }, []);


    const onDelete = useCallback((id) => {
           // dispatch(heroDelete(id)); - просто убірает із стейта
           request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        //    .then(data => console.log(data, 'Delete') )
           .then(dispatch(heroDelete(id)))
           .catch(err => console.log(err))
            // eslint-disable-next-line
        }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Помилка завантаження</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return(
                <CSSTransition timeout={0} classNames="hero">
                    <h5 className="text-center mt-5">Героїв поки що немає</h5>
                </CSSTransition>
            )

        }

        return arr.map(({id, ...props}) => {
                return (
                    <CSSTransition
                        key={id}
                        timeout={500}
                        classNames="hero">
                        <HeroesListItem {...props}  onDelete={() => onDelete(id)} />
                    </CSSTransition>
                )
            })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;
