import { FlatList, ListRenderItem, Pressable,  Text } from 'react-native'
import React from 'react'
import { categoriesData } from '@/constants/data'
import { THEME } from '@/constants/theme'
import Animated, { FadeInRight } from 'react-native-reanimated'
import styles from './styles'


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

