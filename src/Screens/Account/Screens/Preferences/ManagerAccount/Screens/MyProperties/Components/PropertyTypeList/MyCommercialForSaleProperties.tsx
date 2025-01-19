import { View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";

import { ICommercialPropertyForSaleWithManager } from "@/src/GlobalTypes/Property/Commercial/ForSaleTypes";
import EmptyPropertyList from "@/src/Components/EmptyPropertyList/EmptyPropertyList";
import HttpError from "@/src/Components/HttpError/HttpError";
import ReportModal from "@/src/Components/Modals/Report/ReportModal";
import PropertiesListMobileView from "@/src/Components/PropertiesListMobileView/PropertiesListMobileView";
import PropertiesListTabletView from "@/src/Components/PropertiesListTabletView/PropertiesListTabletView";
import { useSharedContext } from "@/src/Context/SharedContext";
import { getManagerCommercialPropertiesForSale } from "@/src/HttpServices/Queries/Manager/ManagerHttpFuncs";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import LoadingSkeleton from "@/src/Screens/Home/Components/LoadingSkeleton/LoadingSkeleton";
import { SCREEN_BREAK_POINT, PropertyTypesEnum } from "@/src/Utils/Constants";
import { myPropertyTypeStyles } from "../Shared/Styles";

type Props = {
  setTotalproperties: React.Dispatch<React.SetStateAction<number>>;
};

const MyCommercialForSaleProperties: React.FC<Props> = ({
  setTotalproperties,
}) => {
  const [properties, setProperties] = useState<
    ICommercialPropertyForSaleWithManager[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [areMorePropertiesLoading, setAreMorePropertiesLoading] =
    useState<boolean>(false);
  const [loadMorehttpError, setloadMoreHttpError] = useState<string>("");
  const [httpError, setHttpError] = useState<string>("");
  const [numberOfpages, setNumberOfPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { width } = useWindowDimensions();
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { accessToken } = useAppSelector((state) => state.user.value);
  const { id } = useAppSelector((state) => state.managerAccount.value);
  const pageLimit = width > SCREEN_BREAK_POINT ? 30 : 12;

  const fetchProperties = () => {
    getManagerCommercialPropertiesForSale({
      page: 1,
      accessToken,
      pageLimit,
      managerId: id,
    })
      .then(({ data: { properties: data, totalPages, count } }) => {
        setProperties(data);
        setNumberOfPages(totalPages);
        setTotalproperties(count);
        setPageNumber((value) => value + 1);
      })
      .catch((error: any) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error !== "") {
            setHttpError(error.response?.data?.error);
          } else setHttpError("Something went wrong");
        } else setHttpError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const refreshProperties = () => {
    getManagerCommercialPropertiesForSale({
      page: 1,
      managerId: id,
      accessToken,
      pageLimit,
    })
      .then(({ data: { properties: data, totalPages, count } }) => {
        setProperties(data);
        setNumberOfPages(totalPages);
        setTotalproperties(count);
        setPageNumber((value) => value + 1);
      })
      .catch((error: any) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error !== "") {
            setHttpError(error.response?.data?.error);
          } else setHttpError("Something went wrong");
        } else setHttpError("Something went wrong");
      })
      .finally(() => setIsRefreshing(false));
  };

  const loadMoreProperties = () => {
    setloadMoreHttpError("");
    if (numberOfpages >= pageNumber) {
      getManagerCommercialPropertiesForSale({
        page: pageNumber,
        managerId: id,
        accessToken,
        pageLimit,
      })
        .then(({ data: { properties: data, totalPages, count } }) => {
          setProperties([...properties, ...data]);
          setNumberOfPages(totalPages);
          setTotalproperties(count);
          setPageNumber((value) => value + 1);
        })
        .catch((error: any) => {
          if (error.response?.data?.error) {
            if (error.response?.data?.error !== "") {
              setloadMoreHttpError(error.response?.data?.error);
            } else setloadMoreHttpError("Something went wrong");
          } else setloadMoreHttpError("Something went wrong");
        })
        .finally(() => setAreMorePropertiesLoading(false));
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPageNumber(1);
    setProperties([]);
    refreshProperties();
  };

  useEffect(() => {
    fetchProperties();
  }, [accessToken, id]);

  useEffect(() => {
    if (httpError) setTotalproperties(0);
  }, [httpError]);

  const text = "You currently do not have commercial properties forsale.";

  return (
    <View style={myPropertyTypeStyles.container}>
      {isLoading && <LoadingSkeleton />}
      {httpError && (
        <View
          style={{
            flex: 1,
            paddingTop: 0,
          }}
        >
          <HttpError
            retryFunc={() => {
              setHttpError("");
              setIsLoading(true);
              fetchProperties();
            }}
          />
        </View>
      )}
      {!httpError && !isLoading && properties.length < 1 && (
        <View
          style={{
            flex: 1,
            paddingTop: 0,
          }}
        >
          <EmptyPropertyList text={text} />
        </View>
      )}
      {!httpError &&
        !isLoading &&
        properties.length > 0 &&
        width <= SCREEN_BREAK_POINT && (
          <PropertiesListMobileView
            propertyType={PropertyTypesEnum.CommercialForSale}
            loadMorehttpError={loadMorehttpError}
            pageNumber={pageNumber}
            data={properties}
            numberOfpages={numberOfpages}
            isRefreshing={isRefreshing}
            loadMoreProperties={loadMoreProperties}
            handleRefresh={handleRefresh}
            setTotalProperties={setTotalproperties}
          />
        )}
      {!httpError &&
        !isLoading &&
        properties.length > 0 &&
        width > SCREEN_BREAK_POINT && (
          <PropertiesListTabletView
            propertyType={PropertyTypesEnum.CommercialForSale}
            loadMorehttpError={loadMorehttpError}
            pageNumber={pageNumber}
            data={properties}
            numberOfpages={numberOfpages}
            isRefreshing={isRefreshing}
            loadMoreProperties={loadMoreProperties}
            handleRefresh={handleRefresh}
            areMorePropertiesLoading={areMorePropertiesLoading}
            setAreMorePropertiesLoading={setAreMorePropertiesLoading}
          />
        )}
      {openReportModal && (
        <ReportModal
          isModalVisible={openReportModal}
          handleCancel={() => setOpenReportModal(false)}
          headerText="Report Image or title"
          type="property"
          managerId={selectedProperty.managerId}
          propertyId={selectedProperty.id}
        />
      )}
    </View>
  );
};

export default MyCommercialForSaleProperties;
