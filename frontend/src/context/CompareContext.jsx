import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const isInCompare = (id) => {
    return compareList.some((item) => item._id === id);
  };

  const toggleCompare = (property) => {
    if (isInCompare(property._id)) {
      setCompareList((prev) => prev.filter((p) => p._id !== property._id));
      toast.success(`Removed "${property.title.slice(0, 25)}..." from comparison`);
    } else {
      if (compareList.length >= 4) {
        toast.error('You can compare a maximum of 4 properties at a time');
        return;
      }
      setCompareList((prev) => [...prev, property]);
      toast.success(`Added to Comparison ⚖️ (${compareList.length + 1}/4)`);
    }
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((p) => p._id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        toggleCompare,
        isInCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
