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
