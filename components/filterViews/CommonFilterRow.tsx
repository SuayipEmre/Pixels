import styles from './styles'
import { Pressable, Text, View } from "react-native"
import { THEME } from "@/constants/theme"
import { FilterRowProps } from "./types"
import { capitalize } from "@/helpers/common"

export const CommonFilterRow: React.FC<FilterRowProps> = ({
    data,
    filterName,
    filters,
    setFilters
}) => {
    
    const onSelect = (filterItem : string) => {
      setFilters({...filters, [filterName] : filterItem})
    }

    return (
        <View style={styles.flex_row_wrap}>
            {
                data && data.map((item, idx) => {
                    const isActive = filters && filters[filterName] == item
                    const backgroundColor = isActive ? THEME.colors.neutral(0.7) : THEME.colors.white
                    const color = isActive ? THEME.colors.white : THEME.colors.neutral(0.7)
                    
                    return (
                       <View key={item}>
                         <Pressable
                            key={item}
                            onPress={() => onSelect(item)}
                            style={[styles.outlined_button, {backgroundColor}]}
                        >
                            <Text style={[styles.outlined_button_text, {color}]}>{capitalize(item)}</Text>

                        </Pressable>
                       </View>
                    )
                })
            }
        </View>
    )
}
