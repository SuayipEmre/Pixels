import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { THEME } from '@/constants/theme'
import Categories from '@/components/categories'
import { apiCall } from '@/api'
import styles from './styles'
import ImageGrid from '@/components/imageGrid'
import { debounce } from 'lodash'

let page = 1

const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const paddingTop = top > 0 ? top + 10 : 30
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef<TextInput>(null);
  const [activeCategory, setActiveCategory] = useState<null | string>(null)
  const [images, setImages] = useState<[] | IImage[]>([])

  const handleChangeCategory = (category: string | null) => setActiveCategory(category)


  type paramsType = {
    page?: string | number,
    q?: string
  }
  const fetchImages = async (params: paramsType = { 'page': 1, }, append = false) => {
    let res = await apiCall(params)

    console.log('params : ', params, append);


    if (res.success && res.data.hits) {

      if (append) setImages([...images, ...res.data.gits])
      else setImages(res.data.hits)

    }



  }

  useEffect(() => {
    fetchImages()
  }, [])


  const handleSearch = (text: string) => {
    setSearchTerm(text)

    //search for text
    if (text.length > 2) {
      setImages([])
      page = 1
      fetchImages({ page, q: text })

    }

    //reset results
    else if (text == '') {
      setImages([])
      page = 1
    searchInputRef.current?.clear()

      fetchImages({ page })
    }

  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  const clearSearch = () => {
    setSearchTerm('')
    handleTextDebounce('')
     
  }

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
            value={searchTerm}
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
            placeholder='Search for photos'
            style={styles.search_input}
          />
          {
            searchTerm && (

              <Pressable style={styles.close_icon} onPress={() => handleTextDebounce('')}>
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
          {
            images?.length > 0 ?
              <ImageGrid images={images} /> :
              searchTerm.length > 0 ? <Text style={styles.cantfound_result_text}>Could not found result for {searchTerm}</Text> : <Text>Gösterilecek image bulunamadı.</Text>
          } 
        </View>


      </ScrollView>
    </View>
  )
}

export default HomeScreen

