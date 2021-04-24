import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ViewStyle } from 'react-native';
import Layout from './layout';

interface KeyboardLayoutProps {
    children: JSX.Element;
    style?: ViewStyle;
}

const KeyboardLayout = ({ children, style }: KeyboardLayoutProps) => {
    return (
        <Layout>
            <KeyboardAvoidingView style={style}>
                <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Layout>
    )
}

export default KeyboardLayout;