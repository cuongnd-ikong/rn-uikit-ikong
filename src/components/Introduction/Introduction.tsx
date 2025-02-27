import React from 'react';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { View } from '../View';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { Text } from '../Text';
type IntroductionProps = {
  renderItemComponent?: (
    item: any,
    index: number,
    animationValue: any
  ) => React.ReactElement;
  renderPagination?: (props: {
    progress: ReturnType<typeof useSharedValue<number>>;
    data: any[];
    onPressPagination: (index: number) => void;
    onPressNextToEnd: () => void;
  }) => React.ReactElement;
  onEnd?: () => void;
  dataList?: any[];
  autoPlay?: boolean;
  timePlay?: string;
  renderAds?: () => React.ReactElement;
};

const defaultDataWith6Colors = [
  {
    color: 'red',
    title: 'red',
    adsItem: <View height={300} flex1 bgColor={'red'} />,
  },
  {
    color: 'blue',
    title: 'blue',
    adsItem: <View height={300} flex1 bgColor={'blue'} />,
  },
  {
    color: 'orange',
    title: 'orange',
    adsItem: <View height={300} flex1 bgColor={'orange'} />,
  },
];

const Introduction = (props: IntroductionProps) => {
  const dataIntro = props?.dataList || defaultDataWith6Colors;
  const { width, height } = useWindowDimensions();

  const progress = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: width,
    height: height,
  } as const;

  const ref = React.useRef<ICarouselInstance>(null);
  const [indexScreen, setIndex] = React.useState(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const onPressNextToEnd = () => {
    if (indexScreen < dataIntro.length - 1) {
      ref.current?.next();
    } else {
      props?.onEnd && props?.onEnd();
    }
  };
  React.useEffect(() => {
    if (props?.autoPlay) {
      const interval = setInterval(
        () => {
          ref.current?.next();
        },
        parseInt(props?.timePlay || '3000', 10)
      );
      return () => clearInterval(interval);
    }
  }, [props?.autoPlay, props?.timePlay, indexScreen]);

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <Carousel
        ref={ref}
        {...baseOptions}
        loop
        onScrollEnd={(index) => setIndex(index)}
        onSnapToItem={(index) => setIndex(index)}
        onProgressChange={progress}
        data={dataIntro}
        renderItem={({ item, index, animationValue }) =>
          props?.renderItemComponent ? (
            props?.renderItemComponent(item, index, animationValue)
          ) : (
            <View style={{ flex: 1 }}>
              <Image source={item?.image} style={{ flex: 1, width: '100%' }} />
              {props?.renderPagination ? (
                props?.renderPagination({
                  progress,
                  data: dataIntro,
                  onPressPagination,
                  onPressNextToEnd,
                })
              ) : (
                <View>
                  <Text
                    numberOfLines={2}
                    bold
                    style={{ paddingHorizontal: 15, textAlign: 'center' }}
                    size={24}
                    lineHeight={30}
                    color={'#000000'}
                  >
                    {item?.title}
                  </Text>
                  <View
                    style={{
                      paddingVertical: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                    }}
                  >
                    <Pagination.Basic
                      size={15}
                      progress={progress}
                      data={dataIntro}
                      dotStyle={{
                        borderRadius: 100,
                        backgroundColor: '#EA7000',
                      }}
                      activeDotStyle={{
                        borderRadius: 100,
                        // overflow: 'hidden',
                        backgroundColor: '#f1f1f1',
                        borderWidth: 1,
                        borderColor: '#EA7000',
                      }}
                      containerStyle={[
                        {
                          gap: 5,
                          marginBottom: 10,
                        },
                      ]}
                      horizontal
                      onPress={onPressPagination}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        onPressNextToEnd();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          padding: 10,
                          color: '#EA7000',
                          fontSize: 24,
                          fontWeight: 'bold',
                        }}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View height={300}>{item?.adsItem}</View>
            </View>
          )
        }
        {...props}
      />
    </View>
  );
};

export default Introduction;
