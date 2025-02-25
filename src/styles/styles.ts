import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
import {COLOR} from './colors';

export const THEME = {
  dark: 'dark',
  light: 'light',
};
const OS = Platform.OS;
const colors = COLOR;

export const FONT_FAMILY = {
  Font1: OS == 'ios' ? '' : '',
  Light: OS == 'ios' ? 'Inter-Light' : 'Inter-Light',
  Regular: OS == 'ios' ? 'Inter-Regular' : 'Inter-Regular',
  Medium: OS == 'ios' ? 'Inter-Medium' : 'Inter-Medium',
  SemiBold: OS == 'ios' ? 'Inter-SemiBold' : 'Inter-SemiBold',
  Bold: OS == 'ios' ? 'Inter-Bold' : 'Inter-Bold',
  ExtraBold: OS == 'ios' ? 'Inter-ExtraBold' : 'Inter-ExtraBold',
  LightTitillium: OS == 'ios' ? 'Inter-Light' : 'Inter-Light',
  RegularTitillium: OS == 'ios' ? 'Inter-Regular' : 'Inter-Regular',
  MediumTitillium: OS == 'ios' ? 'Inter-Medium' : 'Inter-Medium',
  SemiBoldTitillium: OS == 'ios' ? 'Inter-SemiBold' : 'Inter-SemiBold',
  BoldTitillium: OS == 'ios' ? 'Inter-Bold' : 'Inter-Bold',
  ExtraBoldTitillium: OS == 'ios' ? 'Inter-ExtraBold' : 'Inter-ExtraBold',
  RegularBungee: 'Bungee-Regular',
};

export const STYLE = () =>
  StyleSheet.create({
    'color.app.appPrimary': {color: colors.appPrimary},
    'color.app.brandPrimary': {color: colors.brandPrimary},
    'color.app.dark': {color: colors.dark},
    'color.app.dark60': {color: colors.dark60},
    'color.app.dark80': {color: colors.dark80},
    'color.app.stateError': {color: colors.stateError},
    'color.app.stateInfo': {color: colors.stateInfo},
    'color.app.stateWarning': {color: colors.stateWarning},
    'color.app.white': {color: colors.white},

    'bg.app.appPrimary': {backgroundColor: colors.appPrimary},
    'bg.app.dark20': {backgroundColor: colors.dark20},
    'bg.app.dark5': {backgroundColor: colors.dark5},
    'bg.app.dark80': {backgroundColor: colors.dark80},
    'bg.app.hex_0A8AAE': {backgroundColor: colors.hex_0A8AAE},
    'bg.app.hex_F1F3F3': {backgroundColor: colors.hex_F1F3F3},
    'bg.app.hex_F6FCFF': {backgroundColor: colors.hex_F6FCFF},
    'bg.app.hex_FFFDF4': {backgroundColor: colors.hex_FFFDF4},
    'bg.app.white': {backgroundColor: colors.white},

    'border.app.appPrimary': {borderColor: colors.appPrimary},
    // 'border.app.black': {borderColor: colors?.black},
    'border.app.brandPrimary': {borderColor: colors.brandPrimary},
    'border.app.dark20': {borderColor: colors.dark20},
    'border.app.dark40': {borderColor: colors.dark40},
    'border.app.dark60': {borderColor: colors.dark60},
    'border.app.hex_49B6D6': {borderColor: colors.hex_49B6D6},
    'border.app.hex_9D9FA2': {borderColor: colors.hex_9D9FA2},
    'border.app.hex_A5D1E4': {borderColor: colors.hex_A5D1E4},
    'border.app.hex_E6D599': {borderColor: colors.hex_E6D599},
    'border.app.hex_E7E9EC': {borderColor: colors.hex_E7E9EC},

    'bg.overlay': {backgroundColor: 'rgba(0,0,0,.4)'},
    // 'bg.grey200': {backgroundColor: colors.materialGrey200},
    'bg.overlay200': {backgroundColor: 'rgba(0,0,0,.2)'},
    'bg.app.primary': {backgroundColor: colors.appPrimary},
    'border.app.primary': {borderColor: colors.appPrimary},
    'border.app.secondary': {borderColor: '#EEEEEE'},
    'color.app.primary': {color: colors.appPrimary},
    // 'border.grey300': {borderColor: colors.materialGrey300},
    'color.input': {
      backgroundColor: colors.hex_F1F3F3,
      borderColor: colors.hex_E7E9EC,
      borderWidth: 1,
    },
    'color.dark': {color: colors.dark},
    'drop.shadow': {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: -8,
      },
      shadowOpacity: 0.03,
      shadowRadius: 2.62,
      elevation: 4,
    },
  });

export const TEXT_TYPOGRAPHY = () => StyleSheet.create({});

export const TEXT_ALIGNMENT = () => StyleSheet.create({});

export const BUTTON_VARIANT = () => ({
  button: StyleSheet.create({}),
  text: StyleSheet.create({}),
});

export const BUTTON_SIZE = () => ({
  button: StyleSheet.create({}),
  text: StyleSheet.create({}),
});
