import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { IResidentialRentalPropertyWithManager } from "@/src/GlobalTypes/Property/Residential/RentalTypes";
import { useSharedContext } from "@/src/Context/SharedContext";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { getResidentialRentalPropertyHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import { propertyTypeStyles } from "../Components/Shared/Styles";
import HttpError from "@/src/Components/HttpError/HttpError";
import { PropertyTypesEnum } from "@/src/Utils/Constants";
import ImageContainer from "../Components/ImageContainer/ImageContainer";
import Overview from "../Components/OverView/Overview";
import ExteriorInteriorFeatures from "../Components/ExteriorInteriorFeatures/ExteriorInteriorFeatures";

type Props = {
  propertyId: number;
};

const ResidentialRentalProperty: React.FC<Props> = ({ propertyId }) => {
  const [property, setProperty] =
    useState<IResidentialRentalPropertyWithManager | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>("");
  const { width } = useWindowDimensions();
  const { openReportModal, setOpenReportModal, selectedProperty } =
    useSharedContext();
  const { accessToken, id } = useAppSelector((state) => state.user.value);

  const fetchProperty = () => {
    getResidentialRentalPropertyHttpFunc({
      propertyId,
    })
      .then(({ data: { response } }) => {
        setProperty(response);
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

  const refreshProperty = () => {
    getResidentialRentalPropertyHttpFunc({
      propertyId,
    })
      .then(({ data: { response } }) => {
        setProperty(response);
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

  const handleRefresh = () => {
    setProperty(null);
    refreshProperty();
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  return (
    <View style={propertyTypeStyles.container}>
      {isLoading && <Text style={{ color: "white" }}>Loading</Text>}
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
              fetchProperty();
            }}
          />
        </View>
      )}
      {!isLoading && property && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <ImageContainer
            propertyType={PropertyTypesEnum.ResidentialRentals}
            media={property.media}
          />
          <Overview
            propertyType={PropertyTypesEnum.ResidentialRentals}
            property={property}
          />
          {property.otherInteriorFeatures.length > 0 && (
            <ExteriorInteriorFeatures
              features={property.otherInteriorFeatures}
              type="Interior"
            />
          )}
          {property.otherExteriorFeatures.length > 0 && (
            <ExteriorInteriorFeatures
              features={property.otherExteriorFeatures}
              type="Exterior"
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ResidentialRentalProperty;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
