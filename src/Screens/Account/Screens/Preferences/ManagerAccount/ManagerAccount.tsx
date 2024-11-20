import React, { useEffect, useState } from "react";

import { INoPropsReactComponent } from "@/src/GlobalTypes/Types";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import StackScreen from "@/src/Components/StackScreenWrapper/StackScreen";
import SigninAndSignupBtn from "@/src/Components/SigninAndSignupBtns/SigninAndSignupBtn";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import { getManagerByUserId } from "@/src/HttpServices/Queries/Manager/ManagerHttpFuncs";
import { addManagerAccount } from "@/src/Redux/Slices/ManagerAccountSlice/ManagerSlice";
import ManagerProfile from "./Screens/Components/ManagerProfile/ManagerProfile";
import ManagerSignUpBtns from "./Screens/Components/ManagerSignUpBtns/ManagerSignUpBtns";
import ManagerLoader from "./Screens/Components/Loaders/ManagerLoader";
import { noManagerError } from "@/src/Utils/Constants";
import HttpError from "@/src/Components/HttpError/HttpError";

const ManagerAccount: INoPropsReactComponent = () => {
  const user = useAppSelector((state) => state.user.value);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>("");
  const dispatch = useAppDispatch();

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
      <StackScreen>
        {!user.accessToken && <SigninAndSignupBtn screenType={"profile"} />}
        {user.accessToken && (
          <>
            {isLoading && <ManagerLoader />}
            {httpError && httpError !== noManagerError && (
              <HttpError
                retryFunc={() => {
                  setHttpError("");
                  setIsLoading(true);
                  fetchManager();
                }}
              />
            )}
            {httpError === noManagerError && <ManagerSignUpBtns />}
            {!isLoading && !httpError && <ManagerProfile />}
          </>
        )}
      </StackScreen>
    </Screen>
  );
};

export default ManagerAccount;
