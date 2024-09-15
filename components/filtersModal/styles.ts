import { THEME } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { StyleSheet } from "react-native";
const base_styles = StyleSheet.create({
    button: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: THEME.radius.md,
        borderCurve: 'continuous',
    }
})


export default StyleSheet.create({


    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    filter_text: {
        fontSize: hp(4),
        fontWeight: THEME.fontWeights.semibold,
        color: THEME.colors.neutral(0.8),
        marginBottom: 5,

    },
    overlay: {
        backgroundColor: THEME.colors.neutral(0.55)
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    reset_button: {
        ...base_styles.button,
        backgroundColor: THEME.colors.neutral(0.03),
        borderWidth: 1,
        borderColor: THEME.colors.grayBg,
    },
    button_text: {
        fontSize : hp(2.2),
    },
    apply_button: {
        ...base_styles.button,
        backgroundColor: THEME.colors.neutral(0.8),

    },
})

