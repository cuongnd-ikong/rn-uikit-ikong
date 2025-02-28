# rn-uikit-ikong

ui kit

## Installation

```sh
npm install rn-uikit-ikong
```

## Usage

```js
import { View, Text } from "rn-uikit-ikong";

// ...

<View shadow flex1 fullHeight bgColor={Colors.lighter} padding={16} paddingHorizontal={} marginVertical={} style={styles.sectionContainer}/>
<Text size={16} bold centerAlign style={[
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
  {title}
</Text>


 <Introduction
        loop={false}
        onEnd={() => Alert.alert('End')}
        dataList={[
          {
            image: 'https://source.unsplash.com/random/200x300?sig=1',
            title: '11gHggh11 á Ấ ádasd ád ád ád ádasdasdasdasdas ád ád á á',
            adsItem: <View height={300} flex1 bgColor={'red'} />,
          },
          {
            image: 'https://picsum.photos/200/300?random=2',
            title: '22222',
            // adsItem: (
            //   // <LottieView
            //   //   source={IMG_SWIPE_HAND}
            //   //   autoPlay
            //   //   loop
            //   //   style={{height: 300}}
            //   // />
            // ),
          },
          {
            image: 'https://picsum.photos/200/300?random=3',
            title: '3333',
            adsItem: <View height={300} flex1 bgColor={'blue'} />,
          },
        ]}
        // renderItemComponent={(item, index, animationValue) => (
        //   <View
        //     style={{
        //       backgroundColor: item?.color,
        //       flex: 1,
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //     }}>
        //     <Text size={20} color={'#fff'}>
        //       {item?.title}
        //     </Text>
        //   </View>
        // )}
        // renderPagination={({
        //   progress,
        //   data,
        //   onPressPagination,
        //   onPressNextToEnd,
        // }) => {
        //   return (
        //     <View style={{justifyContent: 'center', alignItems: 'center'}}>
        //       <Pagination.Basic<{color: string}>
        //         progress={progress}
        //         data={data.map(item => ({color: item.color}))}
        //         dotStyle={{
        //           width: 25,
        //           height: 25,
        //           backgroundColor: '#262626',
        //         }}
        //         activeDotStyle={{
        //           overflow: 'hidden',
        //           backgroundColor: '#f1f1f1',
        //         }}
        //         containerStyle={{
        //           gap: 10,
        //           marginBottom: 10,
        //         }}
        //         horizontal
        //         onPress={onPressPagination}
        //       />
        //       <TouchableOpacity
        //         onPress={() => {
        //           onPressNextToEnd();
        //         }}
        //         style={{
        //           width: 50,
        //           height: 50,
        //           backgroundColor: 'red',
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //         }}>
        //         <Text>Next</Text>
        //       </TouchableOpacity>
        //     </View>
        //   );
        // }}
        // autoPlay={true}
        // timePlay={'5000'}
      />
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
