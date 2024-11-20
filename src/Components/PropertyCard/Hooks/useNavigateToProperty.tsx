import { router } from "expo-router";

import { IPropertyType } from "@/src/GlobalTypes/Property/Common";

const useNavigateToProperty = (
  propertyType: IPropertyType,
  propertyId: number
) => {
  const navigateToProperty = () => {
    router.push({
      pathname: `/property/${propertyId}`,
      params: {
        propertyType,
      },
    });
  };
  return { navigateToProperty };
};

export default useNavigateToProperty;
