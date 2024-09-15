import { Text, View } from 'react-native'
import React from 'react'
import styles from './styles'

type sectionViewProps = {
    title: string,
    content: React.JSX.Element
}
export const SectionView: React.FC<sectionViewProps> = ({ title, content }) => {

    return (
        <View style={styles.section_container}>
            <Text style={styles.section_title}>{title}</Text>

            <View>
                {content}
            </View>
        </View>
    )
}





