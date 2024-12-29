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
      commercialForsale: {
        figure: "",
        dimension: "m²",
      },
      commercialRentals: {
        figure: "",
        dimension: "m²",
      },
      residentialForsale: {
        figure: "",
        dimension: "m²",
      },
      residentialRentals: {
        figure: "",
        dimension: "m²",
      },
      stand: {
        figure: "",
        dimension: "m²",
      },
      land: {
        figure: "",
        dimension: "m²",
      },
    });
    setPriceFilter({
      commercialForSale: {
        max: 0,
        min: 0,
      },
      residentialForSale: {
        max: 0,
        min: 0,
      },
      stand: {
        max: 0,
        min: 0,
      },
      land: {
        max: 0,
        min: 0,
      },
    });
    setRentFilter({
      commercialRentals: {
        max: 0,
        min: 0,
      },
      residentialRentals: {
        max: 0,
        min: 0,
      },
    });
    setCurrencyFilter({
      commercialForsale: "",
      commercialRentals: "",
      residentialForsale: "",
      residentialRentals: "",
      stand: "",
      land: "",
    });
    setPropertyStructureTypeFilter({
      commercialForsale: "",
      commercialRentals: "",
      residentialForsale: "",
      residentialRentals: "",
      stand: "",
      land: "",
    });
    setRoomsToRentFilter({
      commercialRentalsFigure: "",
      residentialRentalsFigure: "",
    });
    setBathroomsFilter({
      residentialForsaleFigure: "",
      residentialRentalsFigure: "",
    });
    setBedroomsFilter({
      residentialForsaleFigure: "",
      residentialRentalsFigure: "",
    });
    setTotalRoomsFilter({
      commercialForsaleFigure: "",
      commercialRentalsFigure: "",
      residentialForsaleFigure: "",
      residentialRentalsFigure: "",
    });
    dispatch(setActivePropertyType(PropertyTypesEnum.ResidentialRentals));
  };

  return { handleResetFilters };
};

export default useResetFiltersFunc;
