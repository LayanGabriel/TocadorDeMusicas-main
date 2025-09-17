import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(47, 0, 255, 0.25)",
    },
    backButton: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    header: {
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
    },
    profileImage: {
        width: 50,
        height: 50,
        alignSelf: "flex-end",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#fff",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ffffff",
    },

    progressContainer: {
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    },
    progressBarBackground: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    overflow: "hidden",
    },
    progressBarFill: {
    height: 6,
    backgroundColor: "#FF0000", // barra vermelha
    },
    progressText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    },
});