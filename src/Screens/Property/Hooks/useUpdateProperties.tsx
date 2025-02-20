import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import { usePropertiesContext } from "@/src/Context/PropertiesContext";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const useUpdateProperties = (
  propertyType: IPropertyType,
  propertyId: number
) => {
  const {
    onSaleCommercialProperties,
    onSaleResidentialProperties,
    rentalCommercialProperties,
    rentalResidentialProperties,
    standProperties,
    landProperties,
    setLandProperties,
    setOnSaleCommercialProperties,
    setOnSaleResidentialProperties,
    setRentalCommercialProperties,
    setRentalResidentialProperties,
    setStandProperties,
  } = usePropertiesContext();

  const removeDeletedProperty = () => {
    if (propertyType === PropertyTypesEnum.CommercialForSale)
      setOnSaleCommercialProperties(
        onSaleCommercialProperties.filter(
          (property) => property.id !== propertyId
        )
      );
    else if (propertyType === PropertyTypesEnum.CommercialRentals)
      setRentalCommercialProperties(
        rentalCommercialProperties.filter(
          (property) => property.id !== propertyId
        )
      );
    else if (propertyType === PropertyTypesEnum.ResidentialForSale)
      setOnSaleResidentialProperties(
        onSaleResidentialProperties.filter(
          (property) => property.id !== propertyId
        )
      );
    else if (propertyType === PropertyTypesEnum.ResidentialRentals)
      setRentalResidentialProperties(
        rentalResidentialProperties.filter(
          (property) => property.id !== propertyId
        )
      );
    else if (propertyType === PropertyTypesEnum.Land)
      setLandProperties(
        landProperties.filter((property) => property.id !== propertyId)
      );
    else
      setStandProperties(
        standProperties.filter((property) => property.id !== propertyId)
      );
  };
  return { removeDeletedProperty };
};

export default useUpdateProperties;
