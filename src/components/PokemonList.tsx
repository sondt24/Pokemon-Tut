import React, { useEffect, useState } from 'react';
import { Detail } from '../App';

interface Props{
    name: string;
    id: number;
    image: string;
    abilities: {
        abitity: string;
        name: string;
    }[] | undefined;
    viewDetail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonList:React.FC<Props> = (props) => {
    const {name, id, image, abilities, viewDetail, setDetail} = props
    // console.log('abilities: ', abilities)
    const [isSelected, setSelected] = useState(false)
    useEffect(() => {
        setSelected(id === viewDetail?.id);
    }, [viewDetail])

    const closeDetail = () => {
        setDetail({
            id: 0,
            isOpened: false
        })
    }

    return <div className="">
        {isSelected ? (
            <section className="pokemon-list-detailed">
            <div className="detail-container">
                <p className="detail-close" onClick={closeDetail}>
                X
                </p>
                <div className="detail-info">
                <img src={image} alt="pokemon" className="detail-img" />
                <p className="detail-name"> {name}</p>
                </div>
                <div className="detail-skill">
                <p className="detail-ability"> Ablities: </p>
                {abilities?.map((ab: any) => {
                    return <div className=""> {ab.ability.name}</div>;
                })}
                </div>
            </div>
            </section>
        ) : (
            <section className="pokemon-list-container">
            <p className="pokemon-name"> {name} </p>
            <img src={image} alt="pokemon" />
            </section>
        )}
    </div>
}

export default PokemonList