import {
  Modal,
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import { useAppSelector } from "@/src/Redux/Hooks/Config";
import ThemedText from "../../ThemedText/ThemedText";
import RegularText from "../../RegularText/RegularText";
import { dark, gray, primary, pureWhite, white } from "@/src/Theme/Colors";
import {
  activeOpacityOfTouchableOpacity,
  SCREEN_BREAK_POINT,
} from "@/src/Utils/Constants";
import { family, small } from "@/src/Theme/Font";
import { useSharedContext } from "../../../Context/SharedContext";
import ButtonSpinner from "../../Spinners/ButtonSpinner";
import { postPropertyReportHttpFunc } from "@/src/HttpServices/Mutations/Property/Report/ReportHttpFuncs";
import MessageModal from "../MessageModal";

type Props =
  | {
      handleCancel: IVoidFunc;
      isModalVisible: boolean;
      headerText: string;
      type: "user";
    }
  | {
      handleCancel: IVoidFunc;
      isModalVisible: boolean;
      headerText: string;
      type: "property";
      managerId: number;
      propertyId: number;
    };

const ReportModal: React.FC<Props> = (props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [httpError, setHttpError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.value);
  const { id, accessToken } = useAppSelector((state) => state.user.value);
  const { setOpenReportModal } = useSharedContext();
  const { width } = useWindowDimensions();
  const bgColor = theme === "light" ? "#DDDBDE" : "#3B3B3B";

  const reportOptions: string[] = [
    "Sexual content",
    "violent or repulsive content",
    "Hateful or abusive content",
    "Harmful or dangerous acts",
    "Spam or misleading",
    "Property already sold or rented out"
  ];

  const postPropertyReportMutationFunc = useMutation({
    mutationFn: postPropertyReportHttpFunc,
    onSuccess(_data) {
      setOpenSuccessModal(true);
    },
    onError(_error: any) {
      setHttpError("Something went wrong");
    },
    onSettled: () => {
      setSelectedOption("");
      setIsLoading(false);
    },
  });

  const handlePressReport = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (props.type === "property") {
      setIsLoading(true);
      postPropertyReportMutationFunc.mutate({
        report: {
          report: selectedOption,
          propertyId: props.propertyId,
          managerId: props.managerId,
          reporterUserId: id,
        },
        accessToken,
      });
    }
  };

  return (
    <Modal
      visible={props.isModalVisible}
      onRequestClose={props.handleCancel}
      transparent
      animationType="fade"
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme === "light" ? "#000000b3" : "#1b1b1cb3",
          },
        ]}
      >
        <View
          style={[
            styles.subContainer,
            {
              backgroundColor: theme === "light" ? pureWhite : dark.background,
              width: width > SCREEN_BREAK_POINT ? 400 : "90%",
            },
          ]}
        >
          <ScrollView
            contentContainerStyle={{ gap: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <ThemedText type="subHeader">{props.headerText}</ThemedText>
            <View style={styles.optionsContainer}>
              {reportOptions.map((option) => (
                <TouchableOpacity
                  activeOpacity={activeOpacityOfTouchableOpacity}
                  key={option}
                  style={styles.option}
                  onPress={(e: GestureResponderEvent) => {
                    e.stopPropagation();
                    setSelectedOption(option);
                  }}
                >
                  {option === selectedOption ? (
                    <FontAwesome6 name="dot-circle" size={24} color={primary} />
                  ) : (
                    <FontAwesome5
                      name="circle"
                      size={24}
                      color={theme === "light" ? dark.background : pureWhite}
                    />
                  )}
                  <RegularText>{option}</RegularText>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                activeOpacity={activeOpacityOfTouchableOpacity}
                onPress={(e: GestureResponderEvent) => {
                  e.stopPropagation();
                  setOpenReportModal(false);
                }}
                style={[styles.btn, { backgroundColor: bgColor }]}
              >
                <ThemedText type="regular">Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={activeOpacityOfTouchableOpacity}
                style={[
                  styles.btn,
                  { backgroundColor: selectedOption ? primary : bgColor },
                ]}
                disabled={selectedOption || isLoading ? false : true}
                onPress={(e: GestureResponderEvent) => handlePressReport(e)}
              >
                {isLoading ? (
                  <ButtonSpinner backGroundColor="white" />
                ) : (
                  <Text
                    style={[
                      styles.reportText,
                      {
                        color: selectedOption ? white : gray,
                      },
                    ]}
                  >
                    Report
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <MessageModal
          isModalVisible={openSuccessModal}
          header="Report received"
          message="your report was filed successfully, we will deal with it accordingly."
          type="success"
          handleCancel={() => {
            setOpenReportModal(false);
            setOpenSuccessModal(false);
          }}
        />
        <MessageModal
          isModalVisible={httpError ? true : false}
          header="Report Failed!"
          message={httpError}
          type="error"
          handleCancel={() => {
            setHttpError("");
          }}
        />
      </View>
    </Modal>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    padding: 10,
    borderRadius: 10,
    position: "relative",
    gap: 20,
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: "column",
    gap: 5,
  },
  option: {
    height: 50,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
  },
  btn: {
    height: 40,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  reportText: {
    fontFamily: family,
    fontSize: small,
  },
});
