import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { useLocalSearchParams } from "expo-router";
import { getPropertyInsightsByPropertyIdHttpFunc } from "@/src/HttpServices/Queries/Properties/PropertiesHttpFuncs";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import { IPropertyInsights } from "@/src/GlobalTypes/Property/Insights/InsightsTypes";
import { IPropertyType } from "@/src/GlobalTypes/Property/Common";
import HttpError from "@/src/Components/HttpError/HttpError";
import Loader from "../../Components/Loader/Loader";
import { pureWhite, primary } from "@/src/Theme/Colors";
import useGetPropertyInfo from "./Hooks/useGetPropertyInfo";
import PropertyInfo from "./Components/PropertyInfo";
import InsightsDetails from "./Components/InsightsDetails";

const Insights = () => {
  const [insights, setInsights] = useState<IPropertyInsights | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>("");
  const { accessToken } = useAppSelector((state) => state.user.value);
  const theme = useAppSelector((state) => state.theme.value);
  const { id, propertyType } = useLocalSearchParams<{
    id: string;
    propertyType: IPropertyType;
  }>();

  const { image, status, postedTime, type } = useGetPropertyInfo(
    propertyType as IPropertyType
  );

  const fetchPropertyInsights = () => {
    setHttpError("");
    getPropertyInsightsByPropertyIdHttpFunc({
      propertyId: Number(id),
      accessToken,
    })
      .then((data) => {
        setInsights(data.data.response);
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

  const refreshPropertyInsights = () => {
    setIsRefreshing(true);
    setHttpError("");
    getPropertyInsightsByPropertyIdHttpFunc({
      propertyId: Number(id),
      accessToken,
    })
      .then((data) => {
        setInsights(data.data.response);
      })
      .catch((error: any) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error !== "") {
            setHttpError(error.response?.data?.error);
          } else setHttpError("Something went wrong");
        } else setHttpError("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setInsights(null);
    refreshPropertyInsights();
  };

  useEffect(() => {
    fetchPropertyInsights();
  }, [id]);

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header} />
        <View style={styles.container}>
          {isLoading && <Loader />}
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
                  fetchPropertyInsights();
                }}
              />
            </View>
          )}
          {!isLoading && insights && (
            <View style={styles.subContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
                refreshControl={
                  <RefreshControl
                    progressBackgroundColor={
                      theme === "dark" ? pureWhite : primary
                    }
                    tintColor={primary}
                    colors={[theme === "dark" ? primary : pureWhite]}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                  />
                }
              >
                <PropertyInfo
                  image={image}
                  postedTime={postedTime}
                  type={type}
                  propertyType={propertyType as IPropertyType}
                  status={status}
                />
                <InsightsDetails insights={insights}/>
              </ScrollView>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default Insights;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  header: {
    height: 50,
  },
  subContainer: {
    gap: 10,
  },
  scrollViewContainer: {
    gap: 10,
  },
});
