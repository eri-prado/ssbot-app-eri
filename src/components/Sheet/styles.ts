import { StyleSheet, Dimensions } from "react-native"

const DIMENSIONS = Dimensions.get("window")
export const SHEET_HEIGHT = 400
export const SHEET_OVER_DRAG = 20

export const styles = StyleSheet.create({
  container: {
    height: 400,
    width: DIMENSIONS.width,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    zIndex: 9999,

    position: "absolute",
    bottom: -SHEET_OVER_DRAG * 1.3,
  },
  title: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    margin: 24,
  },
  dragIcon: {
    marginTop: 16,
    alignSelf: "center",
  },
})