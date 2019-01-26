import React from "react";
import MapView, {Marker} from "react-native-maps";
import {searchProtest} from "../../redux/explore_protest";
import {styles} from "./styles"
import Spinner from "../../components/spinner";
import {connect} from "react-redux";
import {Image, Text, View} from "react-native";

import {addItem} from "../../utils/headers";



class ProtestMap extends React.Component {
    state = {selected: undefined};


    static navigationOptions = (navigation) => ({
        headerRight: addItem(navigation, () => navigation.navigation.push("ProtestView")),
    });

    componentDidMount() {
        this.props.searchProtest()
    }

    render() {
        if (this.props.protests.loading) {
            return <Spinner/>
        }
        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 48.13,
                            longitude: 11.57,
                            latitudeDelta: .1,
                            longitudeDelta: .1,
                        }}>
                        {this.buildMarkers()}
                    </MapView>
                </View>
                <View style={styles.protestDetails}>
                    {this.renderDetails() || <Text>No Protest selected</Text>}
                </View>
            </View>
        );
    }

    buildMarkers() {
        const context = this;
        return this.props.protests.protests.map((protest, index) => {
            return <Marker
                title={protest.title}
                description={protest.description}
                coordinate={{latitude: protest.startingPoint.x, longitude: protest.startingPoint.y}}
                onPress={() => context.setState({selected: index})}
                key={index}
            />
        })
    }

    renderDetails() {
        if (typeof this.state.selected === "undefined") {
            return;
        }
        const protest = this.props.protests.protests.filter((e, i) => i === this.state.selected)[0];
        console.log(protest);
        return (
            <View style={styles.protestDetailsContainer}>
                <View style={styles.protestImageContainer}>
                    <Image source={{uri: protest.image_url}}
                           onError={(error) => console.log(error)}
                           onLoadStart={(e) => console.log(e)}
                           style={styles.protestImage}/>
                </View>
                <View style={styles.protestElements}>
                    <Text style={styles.protestTitle}>{protest.title}</Text>
                    <Text style={styles.protestDescription}>{protest.descriptionText}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({protests}) => ({
    protests
});

const mapDispatchToProps = {searchProtest};

export default connect(mapStateToProps, mapDispatchToProps)(ProtestMap);