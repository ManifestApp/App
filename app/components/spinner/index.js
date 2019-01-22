import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import styles from './styles';
import { PRIMARY } from '../../utils/colors';


const Spinner = () => (
    <View style={styles.mainContainer}>
        <ActivityIndicator
            animating={true}
            color={PRIMARY}
            size="large"
        />
    </View>
);

export default Spinner;