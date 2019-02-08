import {StyleSheet, Platform} from 'react-native'


const isIOS = Platform.OS === 'ios';

export const styles = StyleSheet.create({
    main: {
        padding: 15,
        flex: 1
    },
    textInput: {
        marginRight: 10
    },

    textInputContainer: {
        flexDirection: 'row',
        paddingVertical: isIOS ? 10 : 0,
    },
    textInputIcon: {
        marginRight: 10
    },
    placePickerModalContainer: {
        flex: 1,
        justifyContent: "center",
    },
    placePicker:{
        flex: .4,
        backgroundColor: 'white'
    }
});

export const iconColor = 'grey';
