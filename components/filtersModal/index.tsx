import { Pressable, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { THEME } from '@/constants/theme'
import { capitalize } from 'lodash'
import { filtersData } from '@/constants/data'
import { SectionKeyEnum } from '@/types/filtersModalSectionKey'
import { CommonFilterRow } from '../filterViews/CommonFilterRow'
import { SectionView } from '../filterViews/SectionView'
import { ColorFilter } from '../filterViews/ColorFilter'
import styles from './styles'
import { CustomBackrop } from './CustomBackdrop'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated'


type filtersModalProps = {
    modalRef: React.RefObject<BottomSheetModalMethods>,
    filters: IFilterTypes | null
    setFilters: (value: IFilterTypes | null) => void,
    onApply: () => void,
    onClose: () => void,
    onReset: () => void,
}
const FiltersModal: React.FC<filtersModalProps> = ({
    modalRef,
    filters,
    onApply,
    onReset,
    setFilters
}) => {
    const snapPoints = useMemo(() => ['50%', '75%'], [])

    return (
        <View>
            <BottomSheetModal
                ref={modalRef}
                index={1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={CustomBackrop}
            >
                <BottomSheetView style={styles.contentContainer}>

                    <View style={styles.content}>
                        <Text style={styles.filter_text}>Filters</Text>
                        {
                            Object.keys(sections).map((sectionName, index) => {
                                const key = sectionName as SectionKeyEnum;

                                const sectionView = sections[key];
                                const sectionData = filtersData[key];
                                const title = capitalize(sectionName);

                                return (
                                    <Animated.View
                                        entering={FadeInLeft.delay((index * 100) + 100).springify().damping(10)}
                                        key={index}>
                                        <SectionView
                                            title={title}
                                            content={sectionView({
                                                data: sectionData,
                                                filters,
                                                setFilters,
                                                filterName: sectionName
                                            })}
                                        />
                                    </Animated.View>
                                )
                            })

                        }
                        {/*Actions */}
                        <Animated.View
                            entering={FadeInLeft.delay(500).springify().damping(10)}
                            style={styles.buttons}>
                            <Pressable style={styles.reset_button} onPress={onReset}>
                                <Text style={[styles.button_text, { color: THEME.colors.neutral(0.9) }]}>Reset</Text>
                            </Pressable>

                            <Pressable style={styles.apply_button} onPress={onApply}>
                                <Text style={[styles.button_text, { color: THEME.colors.white }]}>Apply</Text>
                            </Pressable>
                        </Animated.View>
                    </View>

                </BottomSheetView>
            </BottomSheetModal>
        </View>
    )
}



const sections: Record<SectionKeyEnum, (props: any) => JSX.Element> = {
    order: (props) => <CommonFilterRow {...props} />,
    orientation: (props) => <CommonFilterRow {...props} />,
    type: (props) => <CommonFilterRow {...props} />,
    colors: (props) => <ColorFilter {...props} />,
};


export default FiltersModal

