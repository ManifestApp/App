import React from "react";
import {iconColor, styles} from "./styles";
import {TextInput, View} from "react-native";

import i18n from '../../utils/languages'
import Icon from 'react-native-vector-icons/FontAwesome5';

import {PRIMARY} from "../../utils/colors";
import {addItem} from "../../utils/headers";


export class ProtestView extends React.Component {

    state = {
        title: null,
        description: null,
        image_url: `https://picsum.photos/200?image=1`,
        starting_position: [48.13 + (Math.random() - 0.5) / 15, 11.57 + (Math.random() - 0.5) / 15],
        starting_time: new Date()
    };

    static navigationOptions = (navigation) => ({
       title: i18n.t("protest_create")
    });

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
                <View style={styles.textInputContainer}>
                    <Icon name='calendar-alt' size={20} color={iconColor} style={styles.textInputIcon}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('protest_starting_time')}
                        onChangeText={(starting_time) => this.setState({starting_time})}
                        value={this.state.starting_time}
                        underlineColorAndroid={PRIMARY}
                    />
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

            </View>
        )
    }


}