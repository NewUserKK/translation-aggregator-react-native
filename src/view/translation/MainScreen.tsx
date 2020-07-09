import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ToolbarAndroid from '@react-native-community/toolbar-android';
import { debounce } from 'ts-debounce';

import { styles } from 'styles/translation/MainScreenStyles'
import SearchField from 'src/view/common/SearchField';
import { translateYandex, translateUrban } from 'src/data/translationRepository';
import { Either, rightOf, matchEither } from 'src/domain/common/Either';
import { YandexTranslationResult } from './YandexTranslationResult';
import { UrbanTranslationResult } from './UrbanTranslationResult';
import UrbanTranslationModel from 'src/domain/translation/UrbanTranslationModel';

class MainState {
  constructor(
    readonly query: string = "",
    readonly yandexResult: Either<object, string> = rightOf(""),
    readonly urbanResult: Either<object, [UrbanTranslationModel]> = rightOf([])
  ) {}
}

export default class MainScreen extends Component {
  state = new MainState();

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <SearchField handleTextChange={this.handleTextChange}/>
          {this.renderYandexResult()}
          {this.renderUrbanResult()}
        </View>
      </SafeAreaView>
    );
  }

  private renderYandexResult(): Element {
    const result = this.state.yandexResult;

    return matchEither(result)
      .onRight((value) => <YandexTranslationResult translationResult={value} />)
      .onLeft((value) => <Text>Error: {value.toString()}</Text>)
      .match() as Element
  }

  private renderUrbanResult(): Element {
    const result = this.state.urbanResult;

    return matchEither(result)
      .onRight((value) => <UrbanTranslationResult translationResults={value} />)
      .onLeft((value) => <Text>Error: {value.toString()}</Text>)
      .match() as Element
  }

  private handleTextChange = debounce(async (query: string) => {
    this.setState({query: query})

    const yandexResult = await translateYandex(query)
    this.setState({yandexResult: yandexResult})

    const urbanResult = await translateUrban(query)
    this.setState({urbanResult: urbanResult})
  }, 250)
}