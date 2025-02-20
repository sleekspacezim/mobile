import { IPropertyType, IStatus } from "@/src/GlobalTypes/Property/Common";
import { usePropertyContext } from "@/src/Context/PropertyContext";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const useGetPropertyInfo = (propertyType: IPropertyType) => {
  const {
    rentalCommercialProperty,
    rentalResidentialProperty,
    onSaleCommercialProperty,
    onSaleResidentialProperty,
    landProperty,
    standProperty,
  } = usePropertyContext();

  const propertyInfoDetails: () => {
    image: string;
    type: string;
    status: IStatus;
    postedTime: string;
  } = () => {
    if (
      propertyType === PropertyTypesEnum.CommercialForSale &&
      onSaleCommercialProperty
    )
      return {
        image:
          onSaleCommercialProperty.media.length > 0
            ? onSaleCommercialProperty.media[0].uri
            : "",
        postedTime: onSaleCommercialProperty.postedTime,
        type: onSaleCommercialProperty.type,
        status: onSaleCommercialProperty.status,
      };
    else if (
      propertyType === PropertyTypesEnum.CommercialRentals &&
      rentalCommercialProperty
    )
      return {
        image:
          rentalCommercialProperty.media.length > 0
            ? rentalCommercialProperty.media[0].uri
            : "",
        postedTime: rentalCommercialProperty.postedTime,
        type: rentalCommercialProperty.type,
        status: rentalCommercialProperty.status,
      };
    else if (
      propertyType === PropertyTypesEnum.ResidentialForSale &&
      onSaleResidentialProperty
    )
      return {
        image:
          onSaleResidentialProperty.media.length > 0
            ? onSaleResidentialProperty.media[0].uri
            : "",
        postedTime: onSaleResidentialProperty.postedTime,
        type: onSaleResidentialProperty.type,
        status: onSaleResidentialProperty.status,
      };
    else if (
      propertyType === PropertyTypesEnum.ResidentialRentals &&
      rentalResidentialProperty
    )
      return {
        image:
          rentalResidentialProperty.media.length > 0
            ? rentalResidentialProperty.media[0].uri
            : "",
        postedTime: rentalResidentialProperty.postedTime,
        type: rentalResidentialProperty.type,
        status: rentalResidentialProperty.status,
      };
    else if (propertyType === PropertyTypesEnum.Stands && standProperty)
      return {
        image:
          standProperty.media.length > 0 ? standProperty.media[0].uri : "",
        postedTime: standProperty.postedTime,
        type: standProperty.type,
        status: standProperty.status,
      };
    else if (propertyType === PropertyTypesEnum.Land && landProperty)
      return {
        image:
          landProperty.media.length > 0 ? landProperty.media[0].uri : "",
        postedTime: landProperty.postedTime,
        type: landProperty.type,
        status: landProperty.status,
      };
    else
      return {
        image: "",
        postedTime: "",
        type: "",
        status: "on the market",
      };
  };
  return {
    image: propertyInfoDetails().image,
    postedTime: propertyInfoDetails().postedTime,
    type: propertyInfoDetails().type,
    status: propertyInfoDetails().status,
  };
};

export default useGetPropertyInfo;
