import React, { useEffect } from 'react';
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
  loop?: boolean;
};

const defaultDataWith6Colors = [
  {
    image: 'https://picsum.photos/800/300?random=5',
    color: 'red',
    title: 'red',
    adsItem: <View height={300} flex1 bgColor={'red'} />,
  },
  {
    image: 'https://picsum.photos/200/300?random=2',
    color: 'blue',
    title: 'blue',
    adsItem: <View height={300} flex1 bgColor={'blue'} />,
  },
  {
    image: 'https://picsum.photos/500/300?random=1',
    color: 'orange',
    title: 'orange',
    adsItem: <View height={300} flex1 bgColor={'orange'} />,
  },
];

export const Introduction = (props: IntroductionProps) => {
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

  const itemDefault = ({ item }: { item: any }) => {
    return (
      <View style={{ flex: 1 }}>
        <Image
          src={item?.image}
          resizeMode="stretch"
          style={{ flex: 1, width: '100%' }}
        />
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
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (props?.autoPlay) {
      interval = setInterval(
        () => {
          ref.current?.next();
        },
        Number(props?.timePlay) || 3000
      );
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [props?.autoPlay, props?.timePlay, indexScreen]);

  return (
    <View flex1>
      <Carousel
        ref={ref}
        pagingEnabled
        defaultIndex={0}
        {...baseOptions}
        onScrollEnd={(index) => setIndex(index)}
        onSnapToItem={(index) => setIndex(index)}
        onProgressChange={progress}
        data={dataIntro}
        renderItem={({ item, index, animationValue }) =>
          props?.renderItemComponent
            ? props?.renderItemComponent(item, index, animationValue)
            : itemDefault({ item })
        }
        {...props}
      />
    </View>
  );
};
