import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    searchField: {
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        paddingEnd: 8,
        alignItems: 'center',
        backgroundColor: 'white'
      },
  
      searchField__input: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 
          Platform.OS === 'ios' ? 8 : 2,
      },
  
      searchField__icon: {
        width: 20,
        height: 20,
      },
  
      searchField__icon_disabled: {
        display: 'none'
      },
})