import { THEME } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    section_container: {
        gap: 8,

    },
    section_title: {
        fontSize: hp(2.4),
        fontWeight: THEME.fontWeights.medium,
        color: THEME.colors.neutral(0.8),
    },
    flex_row_wrap: {
        gap : 10,
        flexDirection :'row',
        flexWrap : 'wrap',
    },
    outlined_button: {
        padding : 8,
        paddingHorizontal : 14,
        borderWidth : 1,
        borderColor : THEME.colors.grayBg,
        borderRadius : THEME.radius.xs,
        borderCurve : 'continuous',
    },
    outlined_button_text: {},
    color_wrapper: {
        padding : 3,
        borderRadius : THEME.radius.sm,
        borderWidth : 2,
        borderCurve :'continuous'
    },
    color: {
        height : 30,
        width : 40,
        borderRadius : THEME.radius.sm - 3,
        borderCurve : 'continuous',
    },
})