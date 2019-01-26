import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {createAppContainer, createStackNavigator} from "react-navigation";
import HomeScreen from "./app/screens/Home";
import ProtestMap from "./app/screens/ProtestMap";
import i18n from './app/utils/languages'
import {applyMiddleware, combineReducers, createStore} from "redux";
import protests from "./app/redux/explore_protest"
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Provider} from "react-redux"
import {PRIMARY, DARKER} from "./app/utils/colors";
import {ProtestView} from "./app/screens/ProtestView";

console.log(i18n.t);
const AppNavigator = createStackNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: () => ({
                title: null,
            }),
        },
        ProtestMap: {
            screen: ProtestMap,
            navigationOptions: function () {
                return {title: i18n.t('protests')};
            }
        },
        ProtestView: {
            screen: ProtestView
        }
        // Tutorial: {
        //     screen: Tutorial,
        //     navigationOptions: () => ({
        //         title: `B`,
        //     }),
        // }
    },
    {
        initialRouteName: "ProtestMap",
        defaultNavigationOptions: {
            title: 'JobNinja',
            headerStyle: {
                backgroundColor: PRIMARY,
            },
            headerLayoutPreset: 'center',
            headerTintColor: '#fff',
        }
    }
);

const BundledNavigator = createAppContainer(AppNavigator);

const middlewares = applyMiddleware(thunk, createLogger());
const rootReducer = combineReducers({protests});

const store = createStore(rootReducer, middlewares);


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar backgroundColor={DARKER} barStyle="light-content"/>
                    <BundledNavigator/>
                </View>
            </Provider>
        )
    }
}

// state = {active: false};
//
// startWatching() {
//     this.watchId = navigator.geolocation.watchPosition(() => {
//         this.updateCoordinates();
//     });
//     this.updateCoordinates();
//     this.setState({active: true})
// }
//
// updateCoordinates() {
//     navigator.geolocation.getCurrentPosition((data) => this.newLocation(data));
// }
//
// stopWatching() {
//     if (typeof this.watchId === 'undefined') {
//         return;
//     }
//     navigator.geolocation.clearWatch(this.watchId);
//     this.leaveCurrentNode();
//     this.watchId = undefined;
//     this.lastLocationKey = undefined;
//     this.setState({active: false})
// }
//
// newLocation(loc) {
//     console.log(loc);
//     let longitude = loc.coords.longitude;
//     let long = Math.floor(longitude * 100) / 100;
//     let latitude = loc.coords.latitude;
//     let lat = Math.floor(latitude * 100) / 100;
//     this.setState({latitude: latitude, longitude: longitude});
//     let key = ('' + long).replace('.', ',') + ':' + ('' + lat).replace('.', ',');
//
//     if (key !== this.lastLocationKey) {
//         this.leaveCurrentNode();
//         this.joinNewNode(key);
//     }
//
// }
//
// joinNewNode(key) {
//     firebase.database().ref('/nodes/' + key).transaction(n => (n || 0) + 1);
//     this.lastLocationKey = key;
// }
//
// leaveCurrentNode() {
//     if (this.lastLocationKey) {
//         console.log('decrementing old node');
//         firebase.database().ref('/nodes/' + this.lastLocationKey).transaction(n => (n || 0) - 1);
//     }
// }
//
// createMarkers() {
//     let all_locs = [];
//     if (!this.state.latitude){
//         return all_locs
//     }
//     for (let i = -1; i <= 1; i += 2) {
//         let latitude = this.state.latitude;
//         let longitude = this.state.longitude;
//
//         all_locs.push(<Marker coordinate={{
//             latitude: latitude + i*.01,
//             longitude: longitude,
//             title: `${latitude+ i*.01}; ${longitude}`,
//             key: `${latitude+ i*.01}; ${longitude}`,
//             description: `${latitude+ i*.01}; ${longitude}`
//
//         }}/>)
//
//         all_locs.push(<Marker coordinate={{
//             latitude: latitude,
//             longitude: longitude + i*.01,
//             title: `${latitude}; ${longitude+ i*.01}`,
//             key: `${latitude}; ${longitude+ i*.01}`,
//             description: `${latitude}; ${longitude+ i*.01}`
//         }}/>)
//
//     }
//     return all_locs
// }
//
// render() {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={() => this.state.active ? this.stopWatching() : this.startWatching()}
//                               style={{
//                                   flex: 1,
//                                   backgroundColor: this.state.active ? 'red' : 'green',
//                                   paddingHorizontal: 25,
//                                   paddingVertical: 20,
//                               }}>
//                 <View>
//                     <Text style={{
//                         color: 'white',
//                         textAlign: 'center',
//                         fontSize: 30
//                     }}>{this.state.active ? 'Stop Watching' : 'Start Watching'}</Text>
//                 </View>
//             </TouchableOpacity>
//             <View>
//                 <MapView
//                     style={styles.map}
//                     region={{
//                         latitude: this.state.latitude,
//                         longitude: this.state.longitude,
//                         latitudeDelta: 0.05,
//                         longitudeDelta: 0.05,
//                     }}
//                 ><Marker coordinate={{
//                     latitude: this.state.latitude,
//                     longitude: this.state.longitude
//                 }}/>
//                     {this.createMarkers()}
//                 </MapView>
//             </View>
//         </View>
//
//
//     );
// }
//
// componentWillUnmount() {
//     debugger;
//     this.leaveCurrentNode();
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    map: {
        height: 300,
        width: 300
    }

});
