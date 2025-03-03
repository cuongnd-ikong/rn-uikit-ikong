import React from 'react';
import { Image, type ImageProps } from 'react-native';

const sizeScale = (
  size: number | [number, number],
  width?: number,
  height?: number
) => {
  let [w, h] = Array.isArray(size) ? size : [size, size];
  const ratio = w / h;
  if (width !== undefined) {
    w = width;
    h = (width * 1) / ratio;
  } else if (height !== undefined) {
    h = height;
    w = height * ratio;
  }
  console.log(w, h);
  return { width: w, height: h };
};
type IPropsImageAssets = {
  resizeMode?: ImageProps['resizeMode'];
  style?: any;
  width?: number;
  height?: number;
};

const wrapperImage = (
  size: number | [number, number],
  source: ReturnType<typeof require>
) => {
  return React.memo(({ width, height, style, ...rest }: IPropsImageAssets) => {
    console.log(source);
    return (
      <Image
        {...rest}
        style={{ ...style, ...sizeScale(size, width, height) }}
        source={source}
      />
    );
  });
};
export const IconClose = wrapperImage(12, require('./icons/closeIcon.png'));
export const IconArrowRight = wrapperImage(
  20,
  require('./icons/arrowRightIcon.png')
);
