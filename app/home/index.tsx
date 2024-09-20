import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { THEME } from '@/constants/theme'
import Categories from '@/components/categories'
import { apiCall } from '@/api'
import styles from './styles'
import ImageGrid from '@/components/imageGrid'
import { debounce, filter } from 'lodash'
import FiltersModal from '@/components/filtersModal'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

let page = 1

type paramsType = {
  page?: string | number;
  q?: string;
  category?: string;
} & Partial<IFilterTypes>;



const HomeScreen = () => {
  const [isImageFetchingError, setIsImageFetchingError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<null | IFilterTypes>(null)
  const [activeCategory, setActiveCategory] = useState<null | string>(null)
  const [images, setImages] = useState<[] | IImage[]>([])
  const [isEndReached, setIsEndReached] = useState<boolean>(false)

  const { top } = useSafeAreaInsets()
  const paddingTop = top > 0 ? top + 10 : 30
  const searchInputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const modalRef = useRef<BottomSheetModalMethods>(null);

  useEffect(() => {
    fetchImages()
  }, [])



  const fetchImages = async (params: paramsType = { page: 1 }, append = false) => {
    try {
      const res = await apiCall(params)
  
      if (res.success && res.data.hits) {
        if (append) {
          setImages((prevImages) => [...prevImages, ...res.data.hits])
        } else {
          setImages(res.data.hits)
        }
        setIsImageFetchingError(false)
      } else {
        setIsImageFetchingError(true)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
      setIsImageFetchingError(true)
    }
  };
  

  const handleChangeCategory = (category: string | null) => {
    setActiveCategory(category)
    clearSearch()
    setImages([])
    page = 1
    let params: paramsType = {
      page,
      ...filters
    }

    if (category) params.category = category

    fetchImages(params, false)

  }


  const handleSearch = (text: string) => {
    setSearchTerm(text)

    //search for text
    if (text.length > 2) {
      setImages([])
      page = 1
      fetchImages({ ...filters, page, q: text }, false)
      setActiveCategory(null)

    }

    //reset results
    else if (text == '') {
      setImages([])
      page = 1
      searchInputRef.current?.clear()

      fetchImages({ page, ...filters }, false)
    }

  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  const clearSearch = () => {
    setSearchTerm('')
    searchInputRef.current?.clear()


  }



  const openFiltersModal = () => {
    modalRef?.current?.present()
  }


  const closeFiltersModal = () => {
    modalRef?.current?.close()
  }


  const applyFilters = () => {

    if (filters) {
      page = 1
      setImages([])

      let params: paramsType = {
        page,
        ...filters
      }

      if (activeCategory) params.category = activeCategory
      if (searchTerm) params.q = searchTerm
      fetchImages(params, false)
    }
    closeFiltersModal()
  }

  const resetFilters = () => {
    setFilters(null)
    if (filters) {
      page = 1
      setImages([])
      setFilters(null)
      let params: paramsType = {
        page,
      }

      if (activeCategory) params.category = activeCategory
      if (searchTerm) params.q = searchTerm
      fetchImages(params, false)
    }
    closeFiltersModal()

  }

  const clearThisFilter = (filterName: string) => {
    if (filters) {
      let filterz: IFilterTypes = { ...filters }
      delete filterz[filterName as keyof IFilterTypes]
      setFilters({ ...filterz })
      page = 1
      setImages([])
      let params: paramsType = {
        page,
        ...filterz
      }
      if (activeCategory) params.category = activeCategory
      if (searchTerm) params.q = searchTerm
      fetchImages(params, false)
    }
  }


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

    const contentHeight = event.nativeEvent.contentSize.height
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height
    const scrollOffset = event.nativeEvent.contentOffset.y
    const bottomPosition = contentHeight - scrollViewHeight

    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true)
        console.log('reached the bottom of the scroll view')

        ++page
        let params: paramsType = {
          page,
          ...filters
        }

        if (activeCategory) params.category = activeCategory
        if (searchTerm) params.q = searchTerm
        fetchImages(params, true)

      }

    } else if (isEndReached) {
      setIsEndReached(false)
    }

  }

  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true
    })
  }

  
  return (
    <View style={[{ paddingTop, }, styles.container]}>
      {/*Header */}

      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>

        <Pressable onPress={openFiltersModal}>
          <FontAwesome6 name='bars-staggered' size={22} color={THEME.colors.neutral(0.7)} />
        </Pressable>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5} //how often scrool event willl fire while scrolling (in ms)
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}>

        {/*Search Bar*/}
        <View style={styles.search_bar}>
          <View style={styles.search_icon}>
            <Feather name='search' size={24} color={THEME.colors.neutral(0.4)} />
          </View>
          <TextInput
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

        {/*Applied Filters*/}
        {
          filters && <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.applied_filters}
            >
              {
                Object.keys(filters).map((key, index) => {

                  let backgroundColor = key == 'colors' && key
                  return (
                    <View
                      key={key}
                      style={[{}, styles.applied_filter_item]}>

                      {
                        key == 'colors' ? <View style={{ backgroundColor: filters[key], height: 30, width: 30, borderRadius: 7, }} /> : <Text style={styles.applied_filter_item_text}>
                          {filters[key as keyof IFilterTypes]}
                        </Text>
                      }
                      <Pressable style={styles.applied_filter_close_icon}
                        onPress={() => clearThisFilter(key)}
                      >
                        <Ionicons name='close' size={20} color={THEME.colors.neutral(0.6)} />
                      </Pressable>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
        }
        {/*Images*/}
        <View>
          {
            images?.length > 0 ?
              <ImageGrid images={images} /> :
              searchTerm.length > 0 ?
                <Text style={styles.cantfound_result_text}>Could not found result for {searchTerm}</Text> :
                isImageFetchingError ?
                  <Text>An error occured</Text> :
                  <ActivityIndicator />
          }
        </View>


      </ScrollView>

      {/*Filters Modal */}
      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onClose={closeFiltersModal}
        onReset={resetFilters}
      />
    </View>
  )
}

export default HomeScreen

