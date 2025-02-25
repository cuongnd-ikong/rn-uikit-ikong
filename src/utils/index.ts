import {Dimensions, PixelRatio, Platform as PlatformBase} from 'react-native';
// import {getVersion} from 'react-native-device-info';

const {width, height} = Dimensions.get('window');
const screenDimension = Dimensions.get('screen');

class PBase {
  readonly deviceWidth = width;
  readonly deviceHeight = height;
  readonly deviceFullHeight = screenDimension.height;
  readonly platform = PlatformBase.OS;
  readonly isIOS = PlatformBase.OS === 'ios';
  readonly isAndroid = PlatformBase.OS === 'android';
  readonly borderWidth = 1.5 / PixelRatio.getPixelSizeForLayoutSize(1);
  readonly baseScreenWith = 414;
  readonly baseScreenHeight = 896;
  readonly select = PlatformBase.select;
  readonly OS = PlatformBase.OS;
  readonly scaleWidth = this.deviceWidth / this.baseScreenWith;
  readonly scaleHeight = this.deviceHeight / this.baseScreenHeight;
  readonly sizeScale =
    this.deviceWidth < 720 ? this.scaleWidth : this.scaleHeight;
  readonly SizeScale = (size = 12): number => {
    return this.sizeScale * size;
  };
  readonly WidthScale = (size = 12): number => {
    return this.scaleWidth * size;
  };
  readonly HeightScale = (size = 12): number => {
    return this.scaleHeight * size;
  };
  readonly SpacerScale = (size: number, factor = 1.6) =>
    size * (1 - factor * (1 - this.scaleHeight));
  //   readonly appVersion = getVersion();
  readonly headerHeight = this.SizeScale(50);
  readonly version = PlatformBase.Version;
  readonly footerMarginBottom = this.SizeScale(55);
}

export const Platform = new PBase();

export const Styles = {
  FontFamily: 'SVN-GilroyMedium', // font weight 500
  FontBold: 'SVN-GilroyBold', // font weight > 700
  FontSemiBold: 'SVN-GilroySemiBold', // font weight > 600
  FontRegular: 'SVN-Gilroy', // font weight < 500
  FontItalic: 'SVN-GilroyItalic', // font italic weight 400
  width,
  height,
  paddingHorizontal: 13,
  activeOpacity: 0.6,
  text: {
    fontFamily: 'SVN-GilroyMedium',
  },
  textBold: {
    fontFamily: 'SVN-GilroySemiBold',
    color: '#342A2A',
  },
  // scale: RFValue(1, 667),
  // STATUSBAR_HEIGTH,
  // HEADER_BANNER__HOME_HEIGHT,
  // BALANCE_CARD_HOME_OFFSET,
  // SEARCHBAR_HOME_HEIGHT,
  // SEARCHBAR_HOME_WIDTH,
  // SEARCHBAR_HOME_WRAP_MARGIN_TOP,
};
