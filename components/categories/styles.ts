import { THEME } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingHorizontal: wp(4),
        gap: 8,

    },
    button: {
        padding: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: THEME.colors.grayBg,
        borderRadius: THEME.radius.lg,
        borderCurve: 'continuous',
    },
    category: {
        fontSize: hp(1.8),
        fontWeight: THEME.fontWeights.medium,
    },
})