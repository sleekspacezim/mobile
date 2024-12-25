import { useAppDispatch } from "@/src/Redux/Hooks/Config";
import { usePropertyFiltersContext } from "@/src/Context/PropertyFiltersContext";
import { setActivePropertyType } from "@/src/Redux/Slices/ActivePropertyTypeSlice/ActiveProperty";
import { PropertyTypesEnum } from "@/src/Utils/Constants";

const useResetFiltersFunc = () => {
  const dispatch = useAppDispatch();
  const {
    setBathroomsFilter,
    setBedroomsFilter,
    setCurrencyFilter,
    setPriceFilter,
    setPropertySizeFilter,
    setPropertyStructureTypeFilter,
    setRentFilter,
    setRoomsToRentFilter,
    setTotalRoomsFilter,
  } = usePropertyFiltersContext();

  const handleResetFilters = () => {
    setPropertySizeFilter({
      isActive: false,
      figure: "",
      dimension: "m²",
      propertyType: "",
    });
    setPriceFilter({
      isActive: false,
      max: 0,
      min: 0,
      propertyType: "",
    });
    setRentFilter({
      isActive: false,
      max: 0,
      min: 0,
      propertyType: "",
    });
    setCurrencyFilter({
      isActive: false,
      currency: "",
      propertyType: "",
    });
    setPropertyStructureTypeFilter({
      isActive: false,
      type: "",
      propertyType: "",
    });
    setRoomsToRentFilter({
      isActive: false,
      figure: "",
      propertyType: "",
    });
    setBathroomsFilter({
      isActive: false,
      figure: "",
      propertyType: "",
    });
    setBedroomsFilter({
      isActive: false,
      figure: "",
      propertyType: "",
    });
    setTotalRoomsFilter({
      isActive: false,
      figure: "",
      propertyType: "",
    });
    dispatch(setActivePropertyType(PropertyTypesEnum.ResidentialRentals));
  };

  return { handleResetFilters };
};

export default useResetFiltersFunc;
