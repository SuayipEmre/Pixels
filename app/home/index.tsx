import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { THEME } from '@/constants/theme'
import { hp, wp } from '@/helpers/common'
import Categories from '@/components/categories'

const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const paddingTop = top > 0 ? top + 10 : 30
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<TextInput>(null);
  const [activeCategory, setActiveCategory] = useState<null | string>(null)
  console.log(activeCategory);


  const handleChangeCategory = (category : string | null) =>    setActiveCategory(category)
  

  return (
    <View style={[{ paddingTop, }, styles.container]}>
      {/*Header */}

      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>

        <Pressable>
          <FontAwesome6 name='bars-staggered' size={22} color={THEME.colors.neutral(0.7)} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/*Search Bar*/}

        <View style={styles.search_bar}>
          <View style={styles.search_icon}>
            <Feather name='search' size={24} color={THEME.colors.neutral(0.4)} />
          </View>
          <TextInput
            value={search}
            ref={searchInputRef}
            onChangeText={value => setSearch(value)}
            placeholder='Search for photos'
            style={styles.search_input}
          />
          {
            search && (

              <Pressable style={styles.close_icon} onPress={() => setSearch('')}>
                <Ionicons name='close' size={24} color={THEME.colors.neutral(0.6)} />
              </Pressable>
            )
          }
        </View>

        <View style={styles.categories}>
          <Categories activeCategory={activeCategory} handleChangeCategory = {handleChangeCategory} />
        </View>

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
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
})