import { usePropertiesContext } from "@/src/Context/PropertiesContext";

const useUpdatePropertyFavorite = (propertyId: number) => {
  const {
    setLandProperties,
    setOnSaleCommercialProperties,
    setOnSaleResidentialProperties,
    setRentalCommercialProperties,
    setRentalResidentialProperties,
    setStandProperties,
  } = usePropertiesContext();

  const updateRentalCommercialProperties = () => {
    setRentalCommercialProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const updateOnSaleCommercialProperties = () => {
    setOnSaleCommercialProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const updateRentalResidentialProperties = () => {
    setRentalResidentialProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const updateOnSaleResidentialProperties = () => {
    setOnSaleResidentialProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const updateStandProperties = () => {
    setStandProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
  };

  const updateLandProperties = () => {
    setLandProperties((properties) =>
      properties.map((property) =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );
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
