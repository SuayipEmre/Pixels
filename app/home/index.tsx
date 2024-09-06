import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { THEME } from '@/constants/theme'
import Categories from '@/components/categories'
import { apiCall } from '@/api'
import styles from './styles'
import ImageGrid from '@/components/imageGrid'

const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const paddingTop = top > 0 ? top + 10 : 30
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<TextInput>(null);
  const [activeCategory, setActiveCategory] = useState<null | string>(null)
  const [images, setImages] = useState<[] | IImage[]>([])

  const handleChangeCategory = (category: string | null) => setActiveCategory(category)


  const fetchImages = async (params = { 'page': '1' }, append = false) => {
    let res = await apiCall(params)

    if (res.success && res.data.hits) {

       if (append) setImages([...images, ...res.data.gits])
      else setImages(res.data.hits)

    }



  }

  useEffect(() => {
    fetchImages()
  }, [])

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

        {/*Categories*/}
        <View style={styles.categories}>
          <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
        </View>

        {/*Images*/}

        <View>
          { images?.length > 0 && <ImageGrid images={images} />}
        </View>


      </ScrollView>
    </View>
  )
}

export default HomeScreen

