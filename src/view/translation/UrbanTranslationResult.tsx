import React, { Component } from "react";
import { Text, FlatList, View } from "react-native";
import UrbanTranslationModel from "src/domain/translation/UrbanTranslationModel";
import { styles } from "styles/translation/UrbanTranslationResultStyles";
import { styles as titleStyles } from "styles/translation/SectionTitleStyles";


interface UrbanTranslationResultProps {
  translationResults: [UrbanTranslationModel]
}

export class UrbanTranslationResult extends Component<UrbanTranslationResultProps> {
  render() {
      return (
        <>
          <View style={titleStyles.title}>
            <Text style={titleStyles.titleText}>UrbanDictionary</Text>
          </View>
          <FlatList
            data={this.props.translationResults}
            renderItem={({item}) => this.renderTranslationModel(item)}
            keyExtractor={(item, _) => item.defid.toString()}
          />
        </>
      );
  }

  renderTranslationModel = (model: UrbanTranslationModel) => (
      <View style={styles.listItem}>
        <Text style={styles.text}>Word: {model.word}{"\n"}</Text>
        <Text style={styles.text}>{removeSquareBrackets(model.definition)}{"\n"}</Text>
        <Text style={styles.text}>Example:{"\n"}
          <Text style={styles.itemExample}>{removeSquareBrackets(model.example).replace(/\n\n/g, "\n")}</Text>
        </Text>
      </View>
    );
}

function removeSquareBrackets(s: string) {
  return s.replace(/\[/g, "").replace(/\]/g, "")
}