import React from "react";
import {HeaderButton, HeaderButtons, Item} from "react-navigation-header-buttons";
import iconset from "react-native-vector-icons/FontAwesome";


const IoniconsHeaderButton = props => (
    // the `props` here come from <Item .../>
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton {...props} IconComponent={iconset} iconSize={25} color="white"/>
);

export const addItem = (navigation, callback) => {
    return (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="add" iconName="plus" onPress={() => callback()}/>}
        </HeaderButtons>
    )
};
