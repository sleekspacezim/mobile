import { StyleSheet } from "react-native";

import { primary } from "@/src/Theme/Colors";
import { family, small, medium } from "@/src/Theme/Font";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  managerDetails: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  emailText: {
    fontFamily: family,
    fontSize: small,
    marginTop: -7,
    textAlign:"center"
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  subHeaderText: {
    fontFamily: family,
    fontSize: medium,
    fontWeight: "bold",
  },
  editText: {
    fontFamily: family,
    fontSize: small,
    color: primary,
  },
  infoContainer: {
    gap: 5,
    width: "100%",
  },
  personalDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  personalDetailIconAndText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
});
