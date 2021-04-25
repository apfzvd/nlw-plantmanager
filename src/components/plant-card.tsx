import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';
import { colors, fonts } from '../../styles';

interface PlantCardProps extends RectButtonProps {
    name: string;
    photo: string;
    type?: 'card' | 'row';
    wateringTime?: string;
    handleRemove?: () => void;
}

const PlantCard = ({ name, photo, type = 'card', wateringTime, handleRemove, ...rest }: PlantCardProps) => {
    const styles = type === 'card' ? cardStyles : rowStyles;

    const renderRemoveAction = () => (
        <Animated.View>
            <View style={styles.buttonRemove}>
                <RectButton onPress={handleRemove}>
                    <Feather name="trash" size={32} color="#fff" />
                </RectButton>
            </View>
        </Animated.View>
    );

    const renderSwipable = (content: JSX.Element) => (
        <Swipeable
            overshootRight={false}
            renderRightActions={renderRemoveAction}
        >
            {content}
        </Swipeable>
    );
    
    const renderCard = () => (
        <RectButton style={styles.container} {...rest}>
            <SvgFromUri width={70} height={70} uri={photo} />
            <Text style={styles.text}>
                {name}
            </Text>

            {
                type === 'row' && 
                    <View style={styles.wateringTimeWrap}>
                        <Text style={styles.timeLabel}>Regar às</Text>
                        <Text style={styles.timeText}>{wateringTime}</Text>
                    </View>
            }
        </RectButton>
    );

    return type === 'row' ? renderSwipable(renderCard()) : renderCard();
}

const rowStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        paddingLeft: 10,
        paddingRight: 20,
        marginBottom: 15,
        borderRadius: 10,
        height: 90,
    },
    text: {
        fontFamily: fonts.heading,
        color: colors.heading,
        marginLeft: 20,
        fontSize: 20,
    },
    wateringTimeWrap: {
        flex: 1,
        alignItems: 'flex-end',
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    timeText: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },
    buttonRemove: {
        width: 100,
        height: 90,
        backgroundColor: colors.red,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 20,
    },
});

const cardStyles = StyleSheet.create({
    ...rowStyles,
    container: {
      flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    },
});
  

export default PlantCard;