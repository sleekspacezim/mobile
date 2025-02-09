import { useWindowDimensions, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

import { IVoidFunc } from "@/src/GlobalTypes/Types";
import CustomButton from "@/src/Components/Buttons/Custom/CustomButton";
import OutlinedButton from "@/src/Components/Buttons/Outlined/OutlinedButton";
import { red, white } from "@/src/Theme/Colors";
import { SCREEN_BREAK_POINT, BUTTON_MAX_WIDTH } from "@/src/Utils/Constants";

type Props = {
  navigate: IVoidFunc;
  isDeleting: boolean;
  setOpenDeleteConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonList: React.FC<Props> = ({
  navigate,
  isDeleting,
  setOpenDeleteConfirmationModal,
}) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        gap: 10,
        alignSelf: "center",
        width: width > SCREEN_BREAK_POINT ? BUTTON_MAX_WIDTH : "100%",
      }}
    >
      <OutlinedButton
        title="view insights"
        onPressFunc={() => {}}
        isDisabled={isDeleting}
      />
      <CustomButton
        title="update"
        onPressFunc={navigate}
        isDisabled={isDeleting}
      />
      <CustomButton
        title={isDeleting ? "loading" : "delete"}
        iconPosition="left"
        color={red}
        isDisabled={isDeleting}
        icon={<AntDesign name="delete" size={24} color={white} />}
        onPressFunc={() => setOpenDeleteConfirmationModal(true)}
      />
    </View>
  );
};

export default ButtonList;
