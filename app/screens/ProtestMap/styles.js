import {StyleSheet, Dimensions} from "react-native"


export const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapContainer: {
        flex: .7
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    protestDetails: {
        flex: .3,
        padding: 16,
        flexDirection: 'row'
    },
    protestDetailsContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    protestElements: {
        flex: .7
    },
    protestImageContainer: {
        flex: .3,
    },
    protestImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
        marginRight: 25,
        maxHeight: '70%',
        borderColor: 'grey',
        aspectRatio: 1,
    },
    protestTitle: {
        fontSize: 16
    },
    protestDescription: {}
});