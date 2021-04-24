import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import { colors, fonts } from '../../styles';



interface PlantCardProps extends RectButtonProps {
    name: string;
    photo: string;
}

const PlantCard = ({ name, photo, ...rest }: PlantCardProps) => {
    return (
        <RectButton style={styles.card} {...rest}>
            <SvgFromUri width={70} height={70} uri={photo} />
            <Text style={styles.text}>
                {name}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    card: {
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
    }
  });
  

export default PlantCard;