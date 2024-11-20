import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import Screen from "@/src/Components/ScreenWrapper/Screen";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import PropertiesScreenWrapper from "@/src/Components/PropertiesScreenWrapper/PropertiesScreenWrapper";
import ResidentialRental from "./Forms/ResidentialRental/ResidentialRental";
import ResidentialForSale from "./Forms/ResidentialForSale/ResidentialForSale";
import CommercialRental from "./Forms/CommercialRental/CommercialRental";
import CommercialForSale from "./Forms/CommercialForSale/CommercialForSale";
import Stand from "./Forms/Stand/Stand";
import Land from "./Forms/Land/Land";
import { getManagerByUserId } from "@/src/HttpServices/Queries/Manager/ManagerHttpFuncs";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";
import SigninAndSignupBtn from "@/src/Components/SigninAndSignupBtns/SigninAndSignupBtn";
import ManagerSignUpBtns from "../Account/Screens/Preferences/ManagerAccount/Screens/Components/ManagerSignUpBtns/ManagerSignUpBtns";
import HttpError from "@/src/Components/HttpError/HttpError";
import LoadingSkeleton from "./Forms/Shared/LoadingSkeleton";
import { noManagerError } from "@/src/Utils/Constants";

const PostProperty: INoPropsReactComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>("");
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const { propertType } = useLocalSearchParams();

  const fetchManager = () => {
    setHttpError("")
    getManagerByUserId(user)
      .then((res) => {
        dispatch(addManagerAccount(res.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          if (error.response?.data?.error === noManagerError) {
            setHttpError(error.response.data.error);
            setIsLoading(false);
          } else {
            setHttpError(error.response.data.error);
            setIsLoading(false);
          }
        } else {
          setHttpError("Something went wrong");
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    if (user.accessToken) {
      fetchManager();
    }
  }, [user.accessToken]);

  return (
    <Screen>
      {!user.accessToken && <SigninAndSignupBtn screenType={"post_property"} />}
      {user.accessToken && (
        <>
          {isLoading && <LoadingSkeleton />}
          {httpError && httpError !== noManagerError && (
            <HttpError
              retryFunc={() => {
                setHttpError("");
                setIsLoading(true);
                fetchManager();
              }}
            />
          )}
          {!isLoading && !httpError && (
            <PropertiesScreenWrapper
              propertyType={
                propertType ? (propertType as IPropertyType) : undefined
              }
            >
              <ResidentialRental />
              <ResidentialForSale />
              <CommercialRental />
              <CommercialForSale />
              <Stand />
              <Land />
            </PropertiesScreenWrapper>
          )}
          {httpError === noManagerError && <ManagerSignUpBtns />}
        </>
      )}
    </Screen>
  );
};

export default PostProperty;
