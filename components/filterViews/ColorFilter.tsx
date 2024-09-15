import { FilterRowProps } from "./types"
import { THEME } from "@/constants/theme"
import { Pressable, View } from "react-native"
import styles from "./styles"

export const ColorFilter: React.FC<FilterRowProps> = ({
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
                    let borderColor = isActive ? THEME.colors.neutral(0.4) : 'white'
                    return (
                       <View key={item}>
                         <Pressable
                            key={item}
                            onPress={() => onSelect(item)}
                        >
                            <View style={[styles.color_wrapper, {borderColor}]}>

                                <View style={[styles.color, {backgroundColor : item}]} />
                            </View>

                        </Pressable>
                       

                       </View>
                    )
                })
            }
        </View>
    )
}
