import { useState } from 'react';
import useAlert from './useAlert';
import useFavorites from './useFavorites';
import useAuth from './useAuth';

const useToggleFavoriteButton = (id: number) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { showInfoAlert, showErrorAlert } = useAlert();
  const user = useAuth().data;

  const { data: favorites, updateFavorites, isUpdating, updateError } = useFavorites();

  const isItemFavorite = favorites.includes(id);
  const toggleFavorite = (itemId: number): number[] => {
    return isItemFavorite ? [...favorites].filter((i) => i !== itemId) : [...favorites, itemId];
  };

  const handleClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      showInfoAlert('', 'You need to be logged in to add to favorites');
      return;
    }

    const newIds = toggleFavorite(id);
    updateFavorites({ ids: newIds });
  };

  if (updateError) {
    showErrorAlert('An error occurred while updating favorites.', `ID:${id} | ${updateError}`);
  }

  return {
    handleClick,
    isItemFavorite,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isUpdating,
  };
};

export default useToggleFavoriteButton;
