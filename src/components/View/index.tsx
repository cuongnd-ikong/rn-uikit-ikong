import { View as RNView, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import type { ViewProps } from './type';

export const useViewStyle = (props: any) => {
  const style = StyleSheet.create({
    flex1: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    center: {
      alignItems: 'center',
    },
    centerAll: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    justifyCenter: {
      justifyContent: 'center',
    },
    bgWhite: {},
    flexEnd: {
      justifyContent: 'flex-end',
    },
  });

  const viewStyle = StyleSheet.flatten([
    props.flex1 && style.flex1,
    props.flex && { flex: props.flex },
    props.row && style.row,
    props.centerAll && style.centerAll,
    props.center && style.center,
    props.flexEnd && style.flexEnd,
    props.justifyCenter && style.justifyCenter,
    props.bgColor && {
      backgroundColor: props.bgColor,
    },
    props.borderColor && {
      borderColor: props.borderColor,
    },
    props.width && {
      width: props.width,
    },
    props.height && {
      height: props.height,
    },
    props.padding && {
      padding: props.padding,
    },
    props.paddingHorizontal && {
      paddingHorizontal: props.paddingHorizontal,
    },
    props.paddingVertical && {
      paddingVertical: props.paddingVertical,
    },
    props.paddingLeft && {
      paddingLeft: props.paddingLeft,
    },
    props.paddingRight && {
      paddingRight: props.paddingRight,
    },
    props.borderRadius && {
      borderRadius: props.borderRadius,
    },
    props.marginTop && {
      marginTop: props.marginTop,
    },
    props.marginHorizontal && {
      marginHorizontal: props.marginHorizontal,
    },
    props.zIndex && {
      zIndex: props.zIndex,
    },
    props.fullWidth && {
      width: '100%',
    },
    props.fullHeight && {
      height: '100%',
    },
    props.spaceAround && {
      justifyContent: 'space-around',
    },
    props.spaceBetween && {
      justifyContent: 'space-between',
    },
    props.paddingTop && {
      paddingTop: props.paddingTop,
    },
    props.paddingBottom && {
      paddingBottom: props.paddingBottom,
    },
    props.borderWidth && {
      borderWidth: props.borderWidth,
    },
    props.borderTopLeftRadius && {
      borderTopLeftRadius: props.borderTopLeftRadius,
    },
    props.borderTopRightRadius && {
      borderTopRightRadius: props.borderTopRightRadius,
    },
    props.borderBottomRightRadius && {
      borderBottomRightRadius: props.borderBottomRightRadius,
    },
    props.borderBottomLeftRadius && {
      borderBottomLeftRadius: props.borderBottomLeftRadius,
    },
    props.top && {
      top: props.top,
    },
    props.bottom && {
      bottom: props.bottom,
    },
    props.left && {
      left: props.left,
    },
    props.right && {
      right: props.right,
    },
    props.position && {
      position: props.position,
    },
    props.shadow && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    props.borderBottomWidth && {
      borderBottomWidth: props.borderBottomWidth,
    },
    props.borderTopWidth && {
      borderTopWidth: props.borderTopWidth,
    },
    props.borderStyle && {
      borderStyle: props.borderStyle,
    },
    props.marginBottom && {
      marginBottom: props.marginBottom,
    },
    props.style && props.style,
  ]);

  return viewStyle;
};
export function View(props: ViewProps) {
  const viewStyle = useViewStyle(props);
  if (props.reAnimated) {
    return (
      <Animated.View
        {...props}
        style={StyleSheet.flatten([viewStyle, props.reAnimatedStyle])}
      >
        {props.children}
      </Animated.View>
    );
  }
  return (
    <RNView {...props} style={viewStyle}>
      {props.children}
    </RNView>
  );
}
