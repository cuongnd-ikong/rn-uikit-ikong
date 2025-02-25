import { Text as RNText, StyleSheet } from 'react-native';
import type { TextStyle } from 'react-native';
import { COLOR } from '../../styles';
import { Platform, Styles } from '../../utils';
import type { TextProps, TTextSize } from './type';

export const Text = (props: TextProps) => {
  const {
    children,
    style,
    allowFontScaling = false,
    color = COLOR.dark,
    size = 13,
    centerAlign,
    lineHeight,
    bold,
    semiBold,
    medium,
    regular,
    underline,
    ...other
  } = props;
  const getSize = (_size: TTextSize): number => {
    if (_size === 11) {
      return 11;
    }
    if (_size === 13) {
      return 13;
    }
    if (_size === 16) {
      return 16;
    }
    if (_size === 15) {
      return 15;
    }
    return _size || 15; //normal size
  };

  const textStyle: TextStyle[] = [];

  if (size) {
    textStyle.push({
      fontSize: Platform.SizeScale(getSize(size)),
      lineHeight: Platform.SizeScale(getSize(size) * 1.4),
    });
  }
  if (color) {
    textStyle.push({ color: color });
  }
  if (centerAlign) {
    textStyle.push({ textAlign: 'center' });
  }

  /* font weight */
  if (regular) {
    textStyle.push({
      fontFamily: Styles.FontRegular,
    });
  } else if (medium) {
    textStyle.push({
      fontFamily: Styles.FontFamily,
    });
  } else if (bold) {
    textStyle.push({
      fontFamily: Styles.FontBold,
    });
  } else if (semiBold) {
    textStyle.push({
      fontFamily: Styles.FontSemiBold,
    });
  } else {
    textStyle.push({
      fontFamily: Styles.FontFamily,
    });
  }
  if (underline) {
    textStyle.push({ textDecorationLine: 'underline' });
  }
  if (lineHeight) {
    textStyle.push({ lineHeight: lineHeight });
  }

  /* custom style */
  if (style) {
    textStyle.push(style);
  }

  return (
    <RNText
      style={StyleSheet.flatten(textStyle)}
      {...{ allowFontScaling, ...other }}
    >
      {children}
    </RNText>
  );
};
