import { useColorScheme } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, useRouter } from "expo-router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";

import { getSecureValue } from "@/src/Utils/Funcs";
import {  expoSecureValueKeyNames } from "@/src/Utils/Constants";
import { useAppDispatch, useAppSelector } from "@/src/Redux/Hooks/Config";
import ScreenSpinner from "@/src/Components/Spinners/ScreenSpinner";
import Screen from "@/src/Components/ScreenWrapper/Screen";
import { switchTheme } from "@/src/Redux/Slices/Theme/Theme";
import useUpdateUser from "@/src/Hooks/User/useUpdateUser";
import { addAccessToken } from "@/src/Redux/Slices/UserSlice/User";
import { userRoutes } from "@/src/BackendRoutes/UserRoutes";
import { IUser } from "@/src/GlobalTypes/User/UserTypes";
import { updatePayWall } from "@/src/Redux/Slices/payWallSlice/PayWallState";

const index = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  const { accessToken } = useAppSelector((state) => state.user.value);
  useUpdateUser(userData);

  useLayoutEffect(() => {
    getSecureValue(expoSecureValueKeyNames.theme)
      .then((value: string | null) => {
        if (value) {
          dispatch(switchTheme(value));
        } else {
          dispatch(switchTheme(colorScheme));
        }
      })
      .catch((e) => {
        console.log("theme", e);
      });
  }, []);

  useEffect(() => {
    getSecureValue(expoSecureValueKeyNames.accessToken)
      .then((value: string | null) => {
        if (value) {
          const decoded: JwtPayload = jwtDecode(value);
          const currentDate = new Date();
          if (decoded.exp) {
            if (decoded.exp * 1000 > currentDate.getTime()) {
              if (!accessToken) {
                axios
                  .get(userRoutes.getUserByEmail, {
                    headers: {
                      Authorization: `Bearer ${JSON.parse(value)}`,
                    },
                  })
                  .then((res) => {
                    setUserData(res.data.response);
                    dispatch(updatePayWall(res.data.hasPayWall))
                  })
                  .catch((error) => {
                    if (error.response?.data?.error !== "") {
                      console.log(error.response?.data?.error);
                    } else console.log("Something went wrong", error);
                  })
                  .finally(() => router.replace("/home"));
              } else {
                dispatch(addAccessToken(value));
                router.replace("/home");
              }
            } else router.replace("/login");
          }
        } else {
          router.replace("/home");
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  return (
    <Screen>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <ScreenSpinner />
      {/* <Redirect href={"/home"} /> */}
    </Screen>
  );
};

export default index;
