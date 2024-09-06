import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import { getImageSize, wp } from '@/helpers/common';
import { THEME } from '@/constants/theme';

type ImageCardProps = {
    image: IImage,
    index: number,
    columns: number,
}

const blurhash =
'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const ImageCard: React.FC<ImageCardProps> = ({ image, index, columns}) => {
    
    const getImageHeight  = () => {
      let{imageHeight : height, imageWidth : width} = image
      return {height : getImageSize(height, width)}
    }
    
    const isLastInRow = () => {
      return (index + 1) % columns === 0 
    }
    return (
        <Pressable style={[styles.container, !isLastInRow() && styles.spacing]}>
            <Image
                source={{ uri: image?.webformatURL }}
                style={[styles.image, getImageHeight()]}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={100}
            />
        </Pressable>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    container: {
        backgroundColor : THEME.colors.grayBg,
        borderRadius : THEME.radius.xl,
        borderCurve : 'continuous',
        overflow : 'hidden',
        marginBottom:  wp(2),
    },
    image: {
        height: 300,
        width: '100%',
    },
    spacing:{
        marginRight : wp(2)
    }
})