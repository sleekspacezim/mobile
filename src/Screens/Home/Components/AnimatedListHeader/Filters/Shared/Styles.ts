import { family, small } from "@/src/Theme/Font";
import { StyleSheet } from "react-native";

export const sharedAreaSizeFilterStyles = StyleSheet.create({
  row: {
    gap: 10,
    alignItems: "center",
  },
  dimensionContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 3,
  },
  dimension: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 7,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  dimensionText: {
    fontFamily: family,
    fontSize: small,
    paddingTop: 2,
  },
})

export const sharedPriceFilterStyles = StyleSheet.create({
  row: {
    gap: 10,
    alignItems: "center",
  },
  sliderContainer: {
    gap: 5,
    flexDirection: "column",
    width: "100%",
  },
  inputRow: {
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export const sharedCurrencyFilterStyles = StyleSheet.create({
  row: {
    gap: 10,
    alignItems: "center",
  },
  currencyTypeContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  currencyType: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 7,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  currencyTypeText: {
    fontFamily: family,
    fontSize: small,
    paddingTop: 2,
  },
})

export const sharedPropertyStructureTypeStyles = StyleSheet.create({
  row: {
    gap: 10,
    alignItems: "center",
  },
  propertyTypeContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
    flex: 1,
  },
  propertyTypeOption: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    gap: 6,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  propertyTypeOptionText: {
    fontFamily: family,
    fontSize: small,
    paddingTop: 2,
  },
})

export const sharedRentFilterStyles = StyleSheet.create({
  row: {
    gap: 10,
    alignItems: "center",
  },
  sliderContainer: {
    gap: 5,
    flexDirection: "column",
    width: "100%",
  },
  inputRow: {
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export const sharedRoomsFilterStyles = StyleSheet.create({
  row: {
    gap: 10,
    alignItems: "center",
  },
  roomContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  room: {
    borderRadius: 7,
    borderWidth: 1,
    padding: 7,
    minWidth: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  roomText: {
    fontFamily: family,
    fontSize: small,
    paddingTop: 2,
  },
})