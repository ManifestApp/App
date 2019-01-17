/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firebase from 'react-native-firebase';
import MapView, {Marker} from "react-native-maps";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    state = {active: false};

    startWatching() {
        this.watchId = navigator.geolocation.watchPosition(() => {
            this.updateCoordinates();
        });
        this.updateCoordinates();
        this.setState({active: true})
    }

    updateCoordinates() {
        navigator.geolocation.getCurrentPosition((data) => this.newLocation(data));
    }

    stopWatching() {
        if (typeof this.watchId === 'undefined') {
            return;
        }
        navigator.geolocation.clearWatch(this.watchId);
        this.leaveCurrentNode();
        this.watchId = undefined;
        this.lastLocationKey = undefined;
        this.setState({active: false})
    }

    newLocation(loc) {
        console.log(loc);
        let longitude = loc.coords.longitude;
        let long = Math.floor(longitude * 100) / 100;
        let latitude = loc.coords.latitude;
        let lat = Math.floor(latitude * 100) / 100;
        this.setState({latitude: latitude, longitude: longitude});
        let key = ('' + long).replace('.', ',') + ':' + ('' + lat).replace('.', ',');

        if (key !== this.lastLocationKey) {
            this.leaveCurrentNode();
            this.joinNewNode(key);
        }

    }

    joinNewNode(key) {
        firebase.database().ref('/nodes/' + key).transaction(n => (n || 0) + 1);
        this.lastLocationKey = key;
    }

    leaveCurrentNode() {
        if (this.lastLocationKey) {
            console.log('decrementing old node');
            firebase.database().ref('/nodes/' + this.lastLocationKey).transaction(n => (n || 0) - 1);
        }
    }

    createMarkers() {
        let all_locs = [];
        if (!this.state.latitude){
            return all_locs
        }
        for (let i = -1; i <= 1; i += 2) {
            let latitude = this.state.latitude;
            let longitude = this.state.longitude;

            all_locs.push(<Marker coordinate={{
                latitude: latitude + i*.01,
                longitude: longitude,
                title: `${latitude+ i*.01}; ${longitude}`,
                key: `${latitude+ i*.01}; ${longitude}`,
                description: `${latitude+ i*.01}; ${longitude}`

            }}/>)

            all_locs.push(<Marker coordinate={{
                latitude: latitude,
                longitude: longitude + i*.01,
                title: `${latitude}; ${longitude+ i*.01}`,
                key: `${latitude}; ${longitude+ i*.01}`,
                description: `${latitude}; ${longitude+ i*.01}`
            }}/>)

        }
        return all_locs
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.state.active ? this.stopWatching() : this.startWatching()}
                                  style={{
                                      flex: 1,
                                      backgroundColor: this.state.active ? 'red' : 'green',
                                      paddingHorizontal: 25,
                                      paddingVertical: 20,
                                  }}>
                    <View>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 30
                        }}>{this.state.active ? 'Stop Watching' : 'Start Watching'}</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    ><Marker coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude
                    }}/>
                        {this.createMarkers()}
                    </MapView>
                </View>
            </View>


        );
    }

    componentWillUnmount() {
        debugger;
        this.leaveCurrentNode();
    }
}


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
