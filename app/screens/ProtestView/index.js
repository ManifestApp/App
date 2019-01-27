import React from "react";
import {iconColor, styles} from "./styles";
import {TextInput, TouchableOpacity, View} from "react-native";

import {i18n, moment} from '../../utils/languages'
import Icon from 'react-native-vector-icons/FontAwesome5';

import {PRIMARY} from "../../utils/colors";

import DateTimePicker from 'react-native-modal-datetime-picker';


export class ProtestView extends React.Component {

    state = {
        title: null,
        description: null,
        image_url: `https://picsum.photos/200?image=1`,
        starting_position: [48.13 + (Math.random() - 0.5) / 15, 11.57 + (Math.random() - 0.5) / 15],
        starting_time: new Date(),
        isDatePickerVisible: false,
        isTimePickerVisible: false,
    };

    static navigationOptions = (navigation) => ({
        title: i18n.t("protest_create")
    });

    _showDatePicker = () => this.setState({isDatePickerVisible: true});

    _hideDatePicker = () => this.setState({isDatePickerVisible: false});

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({starting_time: date});
        this._hideDatePicker();
    };

    _showTimePicker = () => this.setState({isTimePickerVisible: true});

    _hideTimePicker = () => this.setState({isTimePickerVisible: false});

    _handleTimePicked = (date) => {
        console.log('A time has been picked: ', date);
        this.setState({starting_time: date});
        this._hideTimePicker();
    };

    renderTime(){
        return moment(this.state.starting_time).format('LT')
    }

    renderDate(){
        return moment(this.state.starting_time).format('LL')
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
                    <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('protest_starting_point')}
                        onChangeText={(starting_position) => this.setState({starting_position})}
                        value={this.state.starting_position}
                        underlineColorAndroid={PRIMARY}
                    />
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

            </View>
        )
    }


}