
import Config from "react-native-config"

import UrbanTranslationModel from "src/domain/translation/UrbanTranslationModel";
import { Either, leftOf, rightOf } from "src/domain/common/Either";


export async function translateYandex(query: string): Promise<Either<object, string>> {
  const baseUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate";
  const keyPart = `key=${Config.YANDEX_API_KEY}`;
  const textPart = `text=${query}`;
  const langPart = "lang=en-ru";

  try {
    const response = await fetch(`${baseUrl}?${keyPart}&${textPart}&${langPart}`);
    const json = await response.json();
    const text = json.text ? json.text.join("\n") : "";
    return rightOf(text);

  } catch (error) {
    console.error(error);
    return leftOf(error);
  }
}

export async function translateUrban(query: string): Promise<Either<object, [UrbanTranslationModel]>> {
  if (query == "") {
    return rightOf([]);
  }

  const url = `http://api.urbandictionary.com/v0/define?term=${query}`;

  try {
    const response = await fetch(url);
    const json = await response.json(); 
    return rightOf(
      json.list.map((item: object) => UrbanTranslationModel.fromJson(item))
    );

  } catch (error) {
    console.error(error);
    return leftOf(error);
  }
}