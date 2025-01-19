import { useFavoritesPropertiesContext } from "@/src/Context/FavoritesPropertiesContext";
import { usePropertiesContext } from "@/src/Context/PropertiesContext";
import { useSearchByLocationPropertyResultsContext } from "@/src/Context/SearchByLocationPropertyResultsContext";

const useUpdatePropertyFavorite = (propertyId: number) => {
  const {
    setLandProperties,
    setOnSaleCommercialProperties,
    setOnSaleResidentialProperties,
    setRentalCommercialProperties,
    setRentalResidentialProperties,
    setStandProperties,
  } = usePropertiesContext();

  const {
    landPropertiesSearchResults,
    standPropertiesSearchResults,
    onSaleCommercialPropertiesSearchResults,
    onSaleResidentialPropertiesSearchResults,
    rentalCommercialPropertiesSearchResults,
    rentalResidentialPropertiesSearchResults,
    setLandPropertiesSearchResults,
    setOnSaleCommercialPropertiesSearchResults,
    setOnSaleResidentialPropertiesSearchResults,
    setRentalCommercialPropertiesSearchResults,
    setRentalResidentialPropertiesSearchResults,
    setStandPropertiesSearchResults,
  } = useSearchByLocationPropertyResultsContext();

  const {
    landFavoriteProperties,
    standFavoriteProperties,
    rentalCommercialFavoriteProperties,
    rentalResidentialFavoriteProperties,
    onSaleCommercialFavoriteProperties,
    onSaleResidentialFavoriteProperties,
    setLandFavoriteProperties,
    setOnSaleCommercialFavoriteProperties,
    setOnSaleResidentialFavoriteProperties,
    setRentalCommercialFavoriteProperties,
    setRentalResidentialFavoriteProperties,
    setStandFavoriteProperties,
  } = useFavoritesPropertiesContext();

  const updateRentalCommercialProperties = () => {
    setRentalCommercialProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
    if (rentalCommercialPropertiesSearchResults.length > 0) {
      setRentalCommercialPropertiesSearchResults((properties) =>
        properties.map((property) =>
          property.id === propertyId
            ? { ...property, isFavorite: !property.isFavorite }
            : property
        )
      );
    }
    if (rentalCommercialFavoriteProperties.length > 0) {
      setRentalCommercialFavoriteProperties((properties) =>
        properties.filter((property) => property.id !== propertyId)
      );
    }
  };

  const updateOnSaleCommercialProperties = () => {
    setOnSaleCommercialProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
    if (onSaleCommercialPropertiesSearchResults.length > 0) {
      setOnSaleCommercialPropertiesSearchResults((properties) =>
        properties.map((property) =>
          property.id === propertyId
            ? { ...property, isFavorite: !property.isFavorite }
            : property
        )
      );
    }
    if (onSaleCommercialFavoriteProperties.length > 0) {
      setOnSaleCommercialFavoriteProperties((properties) =>
        properties.filter((property) => property.id !== propertyId)
      );
    }
  };

  const updateRentalResidentialProperties = () => {
    setRentalResidentialProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
    if (rentalResidentialPropertiesSearchResults.length > 0) {
      setRentalResidentialPropertiesSearchResults((properties) =>
        properties.map((property) =>
          property.id === propertyId
            ? { ...property, isFavorite: !property.isFavorite }
            : property
        )
      );
    }
    if (rentalResidentialFavoriteProperties.length > 0) {
      setRentalResidentialFavoriteProperties((properties) =>
        properties.filter((property) => property.id !== propertyId)
      );
    }
  };

  const updateOnSaleResidentialProperties = () => {
    setOnSaleResidentialProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
    if (onSaleResidentialPropertiesSearchResults.length > 0) {
      setOnSaleResidentialPropertiesSearchResults((properties) =>
        properties.map((property) =>
          property.id === propertyId
            ? { ...property, isFavorite: !property.isFavorite }
            : property
        )
      );
    }
    if (onSaleResidentialFavoriteProperties.length > 0) {
      setOnSaleResidentialFavoriteProperties((properties) =>
        properties.filter((property) => property.id !== propertyId)
      );
    }
  };

  const updateStandProperties = () => {
    setStandProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
    if (standPropertiesSearchResults.length > 0) {
      setStandPropertiesSearchResults((properties) =>
        properties.map((property) =>
          property.id === propertyId
            ? { ...property, isFavorite: !property.isFavorite }
            : property
        )
      );
    }
    if (standFavoriteProperties.length > 0) {
      setStandFavoriteProperties((properties) =>
        properties.filter((property) => property.id !== propertyId)
      );
    }
  };

  const updateLandProperties = () => {
    setLandProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
    if (landPropertiesSearchResults.length > 0) {
      setLandPropertiesSearchResults((properties) =>
        properties.map((property) =>
          property.id === propertyId
            ? { ...property, isFavorite: !property.isFavorite }
            : property
        )
      );
    }
    if (landFavoriteProperties.length > 0) {
      setLandFavoriteProperties((properties) =>
        properties.filter((property) => property.id !== propertyId)
      );
    }
  };

  return {
    updateLandProperties,
    updateStandProperties,
    updateOnSaleCommercialProperties,
    updateOnSaleResidentialProperties,
    updateRentalResidentialProperties,
    updateRentalCommercialProperties,
  };
};

export default useUpdatePropertyFavorite;
