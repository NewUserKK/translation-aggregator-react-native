export default class UrbanTranslationModel {
  constructor(
    readonly word: string = "",
    readonly definition: string = "",
    readonly example: string = "",
    readonly defid: number = 0
  ) {}

  static fromJson = (object: object): UrbanTranslationModel => 
    Object.assign(new UrbanTranslationModel(), object)
}