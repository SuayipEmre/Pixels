import { THEME } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4)
  },
  title: {
    fontSize: hp(4),
    fontWeight: THEME.fontWeights.semibold,
    color: THEME.colors.neutral(0.9)
  },
  search_bar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.grayBg,
    backgroundColor: THEME.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: THEME.radius.lg
  },
  search_icon: {
    padding: 8,
  },
  search_input: {
    flex: 1,
    borderRadius: THEME.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8)
  },
  close_icon: {
    backgroundColor: THEME.colors.neutral(0.1),
    padding: 8,
    borderRadius: THEME.radius.sm,

  },
  categories: {},
  applied_filters: {
    paddingHorizontal: wp(4),
    gap: 10
  },
  applied_filter_item: {
    backgroundColor: THEME.colors.grayBg,
    padding: 8,
    flexDirection :'row',
    alignItems:'center',
    borderRadius : THEME.radius.xs,
    gap:10,
    paddingHorizontal : 10,
  },
  applied_filter_close_icon: {
    backgroundColor : THEME.colors.neutral(0.2),
    padding:3,
    borderRadius:7,
  },
  applied_filter_item_text: {
    fontSize : hp(1.5),
  },
  cantfound_result_text: {
    fontSize: hp(2),
    fontWeight: THEME.fontWeights.medium,
    alignSelf: 'center',
    color: THEME.colors.red(0.8)
  },
})