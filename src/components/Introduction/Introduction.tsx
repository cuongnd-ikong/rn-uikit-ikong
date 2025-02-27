import React, { useEffect } from 'react';
import { View } from '../View';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
type IntroductionProps = {
  renderItemComponent: (
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
  dataList: any[];
  autoPlay?: boolean;
  timePlay?: string;
  renderAds?: () => React.ReactElement;
};

const defaultDataWith6Colors = [
  { color: 'red', title: 'red', adsItem: <></> },
  { color: 'blue', title: 'blue', adsItem: <></> },
  { color: 'orange', title: 'orange', adsItem: <></> },
];

const PAGE_WIDTH = 430;

export const Introduction = (props: IntroductionProps) => {
  const progress = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
  } as const;

  const ref = React.useRef<ICarouselInstance>(null);
  const [indexScreen, setIndex] = React.useState(0);

  const onPressPagination = (index: number) => {
    console.log('data', progress.value);
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const onPressNextToEnd = () => {
    if (indexScreen < props?.dataList.length - 1) {
      ref.current?.next();
    } else {
      props?.onEnd && props?.onEnd();
    }
  };
  useEffect(() => {
    if (props?.autoPlay) {
      const interval = setInterval(
        () => {
          ref.current?.next();
        },
        parseInt(props?.timePlay || '3000', 10)
      );
      return () => clearInterval(interval);
    }
    return undefined;
  }, [props?.autoPlay, props?.timePlay, indexScreen]);

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <Carousel
        style={{ height: '100%' }}
        ref={ref}
        {...baseOptions}
        loop
        onScrollEnd={(index) => setIndex(index)}
        onSnapToItem={(index) => setIndex(index)}
        onProgressChange={progress}
        data={props?.dataList}
        renderItem={({ item, index, animationValue }) =>
          props?.renderItemComponent(item, index, animationValue) || <></>
        }
        {...props}
      />
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        {props?.renderPagination ? (
          props?.renderPagination({
            progress,
            data: props?.dataList || defaultDataWith6Colors,
            onPressPagination,
            onPressNextToEnd,
          })
        ) : (
          <Pagination.Basic
            progress={progress}
            data={props?.dataList}
            dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPressPagination}
          />
        )}
        {props?.renderAds && props?.renderAds()}
      </View>
    </View>
  );
};
