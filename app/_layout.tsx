import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { store } from "@/src/Redux/Store";
import { SharedContextProvider } from "@/src/Context/SharedContext";
import { PropertiesContextProvider } from "@/src/Context/PropertiesContext";
import { PropertyFiltersContextProvider } from "@/src/Context/PropertyFiltersContext";
import { BottomSheetsContextProvider } from "@/src/Context/BottomSheetsContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    prepare();
  }, []);

  const queryClient = new QueryClient();

  if (!fontsLoaded) return undefined;
  else SplashScreen.hideAsync();

  return (
    <Provider store={store}>
      <SharedContextProvider>
        <PropertiesContextProvider>
          <PropertyFiltersContextProvider>
            <BottomSheetsContextProvider>
              <RootSiblingParent>
                <QueryClientProvider client={queryClient}>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <Stack
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false }}
                      />
                    </Stack>
                  </GestureHandlerRootView>
                </QueryClientProvider>
              </RootSiblingParent>
            </BottomSheetsContextProvider>
          </PropertyFiltersContextProvider>
        </PropertiesContextProvider>
      </SharedContextProvider>
    </Provider>
  );
};

export default RootLayout;
