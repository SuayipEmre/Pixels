import { ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MasonryFlashList, MasonryListRenderItem } from '@shopify/flash-list'
import ImageCard from '../imageCard'
import { getColumnCount, hp, wp } from '@/helpers/common'

type ImageGridProps = {
    images: IImage[]
}
const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {

    const columns = getColumnCount()

    return (
        <View style={styles.container}>
            <MasonryFlashList
                showsVerticalScrollIndicator={false}
                data={images}
                contentContainerStyle={styles.list_container}
                renderItem={({ item, index }) => <ImageCard image={item} index={index} columns={columns} />}
                numColumns={columns}
                estimatedItemSize={200}
            />
        </View>
    )
}

export default ImageGrid

const styles = StyleSheet.create({
    container: {
        minWidth: 3,
        width: wp(100),
    },
    list_container: {
        paddingHorizontal: wp(4),
    }
})