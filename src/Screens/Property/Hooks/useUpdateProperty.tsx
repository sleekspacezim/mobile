import { usePropertyContext } from "@/src/Context/PropertyContext";

const useUpdateProperty = () => {
  const {
    setLandProperty,
    setOnSaleCommercialProperty,
    setOnSaleResidentialProperty,
    setRentalCommercialProperty,
    setRentalResidentialProperty,
    setStandProperty,
    standProperty,
    landProperty,
    rentalCommercialProperty,
    rentalResidentialProperty,
    onSaleCommercialProperty,
    onSaleResidentialProperty,
  } = usePropertyContext();

  const updateRentalResidentialProperty = () => {
    if (rentalResidentialProperty) {
      setRentalResidentialProperty({
        ...rentalResidentialProperty,
        isFavorite: !rentalResidentialProperty.isFavorite,
      });
    }
  };

  const updateRentalCommercialProperty = () => {
    if (rentalCommercialProperty) {
      setRentalCommercialProperty({
        ...rentalCommercialProperty,
        isFavorite: !rentalCommercialProperty.isFavorite,
      });
    }
  };

  const updateOnSaleCommercialProperty = () => {
    if (onSaleCommercialProperty) {
      setOnSaleCommercialProperty({
        ...onSaleCommercialProperty,
        isFavorite: !onSaleCommercialProperty.isFavorite,
      });
    }
  };

  const updateOnSaleResidentialProperty = () => {
    if (onSaleResidentialProperty) {
      setOnSaleResidentialProperty({
        ...onSaleResidentialProperty,
        isFavorite: !onSaleResidentialProperty.isFavorite,
      });
    }
  };

  const updateStandProperty = () => {
    if (standProperty) {
      setStandProperty({
        ...standProperty,
        isFavorite: !standProperty.isFavorite,
      });
    }
  };

  const updateLandProperty = () => {
    if (landProperty) {
      setLandProperty({
        ...landProperty,
        isFavorite: !landProperty.isFavorite,
      });
    }
  };

  return {
    updateLandProperty,
    updateOnSaleCommercialProperty,
    updateOnSaleResidentialProperty,
    updateRentalCommercialProperty,
    updateRentalResidentialProperty,
    updateStandProperty
  };
};

export default useUpdateProperty;
