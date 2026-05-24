import { useState, useEffect } from 'react';

function Wishlist({ properties }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const addToWishlist = (property) => {
    if (!wishlist.find(p => p.id === property.id)) {
      const newWishlist = [...wishlist, property];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      alert('Added to wishlist! ❤️');
    }
  };

  const removeFromWishlist = (id) => {
    const newWishlist = wishlist.filter(p => p.id !== id);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  return { wishlist, addToWishlist, removeFromWishlist };
}

export default Wishlist;
