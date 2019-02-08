import React from "react";
import {iconColor, styles} from "./styles";
import {TextInput, TouchableOpacity, View} from "react-native";

import {i18n, moment} from '../../utils/languages'
import Icon from 'react-native-vector-icons/FontAwesome5';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


import {PRIMARY} from "../../utils/colors";

import DateTimePicker from 'react-native-modal-datetime-picker';
import {GOOGLE_PLACE_API_KEY} from "../../utils/api_keys";
import Modal from "react-native-modal";
import _ from "lodash"

export class ProtestView extends React.Component {

    state = {
        title: null,
        description: null,
        image_url: `https://picsum.photos/200?image=1`,
        starting_position: [48.13 + (Math.random() - 0.5) / 15, 11.57 + (Math.random() - 0.5) / 15],
        starting_time: new Date(),
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        isPlacePickerVisible: false,
        place: null
    };

    static navigationOptions = (navigation) => ({
        title: i18n.t("protest_create")
    });

    _showDatePicker = () => this.setState({isDatePickerVisible: true});

    _hideDatePicker = () => this.setState({isDatePickerVisible: false});

    _showPlacePicker = () => this.setState({isPlacePickerVisible: true});

    _hidePlacePicker = () => this.setState({isPlacePickerVisible: false});

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({starting_time: date});
        this._hideDatePicker();
    };

    _handlePlacePicked = (place) => {
        console.log('A place has been picked: ', JSON.stringify(place));
        this.setState({starting_position: [place.lat, place.lng]});
        this._hidePlacePicker();
    };

    _showTimePicker = () => this.setState({isTimePickerVisible: true});

    _hideTimePicker = () => this.setState({isTimePickerVisible: false});

    _handleTimePicked = (date) => {
        console.log('A time has been picked: ', date);
        this.setState({starting_time: date});
        this._hideTimePicker();
    };

    renderTime() {
        return moment(this.state.starting_time).format('LT')
    }

    renderDate() {
        return moment(this.state.starting_time).format('LL')
    }

    renderLocation() {
        return this.state.starting_position.join("; ")
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.textInputContainer}>
                    <Icon name='angry' size={20} color={iconColor} style={styles.textInputIcon}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('protest_title')}
                        onChangeText={(title) => this.setState({title})}
                        value={this.state.title}
                        underlineColorAndroid={PRIMARY}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <Icon name='file-alt' size={20} color={iconColor} style={styles.textInputIcon}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('protest_description')}
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                        underlineColorAndroid={PRIMARY}
                        multiline={true}
                        numberOfLines={10}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <Icon name='image' size={20} color={iconColor} style={styles.textInputIcon}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('protest_image')}
                        onChangeText={(image_url) => this.setState({image_url})}
                        value={this.state.image_url}
                        underlineColorAndroid={PRIMARY}
                    />
                </View>
                {/*TODO: Translate all buttons*/}
                <View style={styles.textInputContainer}>
                    <Icon name='calendar-alt' size={20} color={iconColor} style={styles.textInputIcon}/>
                    <TouchableOpacity onPress={() => this._showDatePicker()}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={i18n.t('protest_starting_day')}
                            value={this.renderDate()}
                            underlineColorAndroid={PRIMARY}
                            disabled={true}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.textInputContainer}>
                    <Icon name='clock' size={20} color={iconColor} style={styles.textInputIcon}/>
                    <TouchableOpacity onPress={() => this._showTimePicker()}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={i18n.t('protest_starting_time')}
                            value={this.renderTime()}
                            underlineColorAndroid={PRIMARY}
                            disabled={true}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.textInputContainer}>
                    <Icon name='map-marker' size={20} color={iconColor} style={styles.textInputIcon}/>
                    <TouchableOpacity onPress={() => this._showPlacePicker()}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={i18n.t('protest_starting_point')}
                            onChangeText={(starting_position) => this.setState({starting_position})}
                            value={this.renderLocation()}
                            disabled={true}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                </View>

                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDatePicker}
                    date={this.state.starting_time}
                />
                <DateTimePicker
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this._handleTimePicked}
                    onCancel={this._hideTimePicker}
                    date={this.state.starting_time}
                    mode='time'
                />


                <View>
                    <Modal isVisible={this.state.isPlacePickerVisible} style={{ flex: 1 }}
                    >
                        <View style={styles.placePickerModalContainer}>
                            <View style={styles.placePicker}>
                                <GooglePlacesAutocomplete
                                    placeholder={i18n.t("search_location")}
                                    minLength={2} // minimum length of text to search
                                    autoFocus={false}
                                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                    listViewDisplayed='auto'    // true/false/undefined
                                    fetchDetails={true}
                                    renderDescription={row => _.truncate(row.description,  {
                                        omission: '...',
                                        length: 45
                                    })} // custom description render
                                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                        this._handlePlacePicked(details.geometry.location)
                                    }}

                                    getDefaultValue={() => ''}

                                    query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: GOOGLE_PLACE_API_KEY,
                                        language: 'fr', // language of the results
                                    }}

                                    styles={{
                                        textInputContainer: {
                                            width: '100%'
                                        },
                                        description: {
                                            fontWeight: 'bold'
                                        },
                                        predefinedPlacesDescription: {
                                            color: '#1faadb'
                                        }
                                    }}



                                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                    currentLocationLabel="Current location"
                                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                    GoogleReverseGeocodingQuery={{
                                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                    }}
                                    GooglePlacesSearchQuery={{
                                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                        rankby: 'distance',
                                        types: 'food'
                                    }}

                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                    predefinedPlaces={[]}

                                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                />
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
        )
    }


}
