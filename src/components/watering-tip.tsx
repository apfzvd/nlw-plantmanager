import React from 'react';
import { StyleSheet, Image, View, Text} from 'react-native';
import { colors, fonts } from '../../styles';

import waterDrop from '../assets/waterdrop.png';

interface WateringTipProps {
    tip: string;
    floatUp?: boolean;
}

const WateringTip = ({ tip, floatUp = true }: WateringTipProps) => {
    return (
        <View style={[styles.tipWrapper, floatUp && { position: 'relative', bottom: 60  }]}>
            <Image source={waterDrop} />
            <Text style={styles.tip}>{tip}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tipWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors. blue_light,
        padding: 20,
        borderRadius: 20,
    },
    tip: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 16,
        textAlign: 'left',
    },
  });
  

export default WateringTip;