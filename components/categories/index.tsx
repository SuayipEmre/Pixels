import { FlatList, ListRenderItem, Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { categoriesData } from '@/constants/data'
import { hp, wp } from '@/helpers/common'
import { THEME } from '@/constants/theme'
import Animated, { FadeInRight } from 'react-native-reanimated'


type CategoriesProps = {
    activeCategory: string | null,
    handleChangeCategory: (category: string | null) => void
}
const Categories: React.FC<CategoriesProps> = ({ activeCategory, handleChangeCategory }) => {


    const renderCategories: ListRenderItem<string> = ({ item, index }) => {
        let color = activeCategory == item ? THEME.colors.white : THEME.colors.neutral(0.8)
        let backgroundColor = activeCategory == item ? THEME.colors.neutral(0.8) : THEME.colors.white
        return (
            <Animated.View
            entering={FadeInRight.delay(200 * index).duration(1000).springify().damping(14)}
            >
                <Pressable style={[{ backgroundColor }, styles.button]} onPress={() => handleChangeCategory(activeCategory === item ? null : item)}>
                    <Text style={[{ color }, styles.category]}>{item}</Text>
                </Pressable>
            </Animated.View>
        )
    }
    return (
        <FlatList
            data={categoriesData}
            renderItem={renderCategories}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        />
    )
}

export default Categories

const styles = StyleSheet.create({
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