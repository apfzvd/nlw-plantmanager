import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import LottieView from 'lottie-react-native';

import animationJson from '../assets/load.json';

interface LoadingProps extends ViewProps {}

const Loading = ({ style }: LoadingProps) => {
    return (   
        <View style={[styles.container, style]}>
            <LottieView
                source={animationJson}
                autoPlay
                loop
            />
        </View>  
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });
  

export default Loading;