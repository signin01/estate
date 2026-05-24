import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';

function FavoriteButton({ propertyId, userId }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            const favs = JSON.parse(savedFavorites);
            setFavorites(favs);
            setIsFavorite(favs.includes(propertyId));
        }
    }, [propertyId]);

    const toggleFavorite = () => {
        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = favorites.filter(id => id !== propertyId);
            toast.success('Removed from favorites');
        } else {
            updatedFavorites = [...favorites, propertyId];
            toast.success('Added to favorites');
        }
        setFavorites(updatedFavorites);
        setIsFavorite(!isFavorite);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <button onClick={toggleFavorite} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: isFavorite ? '#e91e63' : '#ccc' }}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
}

export default FavoriteButton;
