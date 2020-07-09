import React, { Component } from "react";
import { View, TextInput, Image } from "react-native";

import { styles } from "../../../styles/common/SearchFieldStyles"

export interface SearchFieldProps {
  handleTextChange: (text: string) => void
}
  
export default class SearchField extends Component<SearchFieldProps> {
  state = { showSearchIcon: true }

  render() {
    return (
      <View style={styles.searchField}>
        <TextInput 
          style={styles.searchField__input}
          selectTextOnFocus={true}
          onChangeText={this.handleTextChange}
        />
        <Image 
          source={require('assets/img/search_black_18dp.png')}
          style={[
            styles.searchField__icon,
            !this.state.showSearchIcon ? styles.searchField__icon_disabled : []
          ]}
        />
      </View>
    );
  }

  private handleTextChange = (newText: string) => {
    this.setState({showSearchIcon: !newText})
    this.props.handleTextChange(newText)
  }
}