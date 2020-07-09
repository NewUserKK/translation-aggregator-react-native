import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "styles/translation/YandexTranslationResultStyles";
import { styles as titleStyles } from "styles/translation/SectionTitleStyles";


interface YandexTranslationResultProps {
  translationResult: string
}

export class YandexTranslationResult extends Component<YandexTranslationResultProps> {
  render() {
      return (
        <>
          <View style={titleStyles.title}>
            <Text style={titleStyles.titleText}>Yandex</Text>
          </View>
          <Text style={[styles.result, styles.container, styles.text]}>Translation: {this.props.translationResult}</Text>
        </>
      );
  }
}