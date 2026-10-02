import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    const local = localStorage.getItem('localWishlist');
    return local ? JSON.parse(local) : [];
  });

  // Load wishlist from server when logged in
  useEffect(() => {
    if (user && user.wishlist) {
      if (Array.isArray(user.wishlist) && user.wishlist.length > 0 && typeof user.wishlist[0] === 'object') {
        setWishlist(user.wishlist);
      } else {
        authAPI
          .getWishlist()
          .then((res) => {
            if (Array.isArray(res.data)) {
              setWishlist(res.data);
            }
          })
          .catch(() => {});
      }
    }
  }, [user]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('localWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (propertyId) => {
    return wishlist.some((item) => (item._id || item) === propertyId);
  };

  const toggleWishlist = async (property) => {
    const id = property._id;
    const exists = isInWishlist(id);

    if (user) {
      try {
        const res = await authAPI.toggleWishlist(id);
        if (res.data.success) {
          setWishlist(res.data.wishlist);
          if (res.data.isAdded) {
            toast.success('Added to your Wishlist ❤️');
          } else {
            toast.success('Removed from your Wishlist');
          }
          return;
        }
      } catch (err) {
        console.error('Wishlist sync error:', err);
      }
    }

    // Local fallback for guest or instant UI feedback
    if (exists) {
      setWishlist((prev) => prev.filter((item) => (item._id || item) !== id));
      toast.success('Removed from your Wishlist');
    } else {
      setWishlist((prev) => [...prev, property]);
      toast.success('Added to your Wishlist ❤️');
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
