import React from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { IconArrowRight, IconClose } from '../../assets';
import { COLOR } from '../../styles';
import { Platform as P } from '../../utils/index';
import { Text } from '../Text';
import { View } from '../View';

export type PermissionType =
  | 'camera'
  | 'photos'
  | 'microphone'
  | 'storage'
  | string;

export type PermissionHandler = (permission: string) => Promise<boolean>;

export type PermissionDataType = {
  key: PermissionType;
  label: string;
  androidPermission?: string;
  iosPermission?: string;
};

type GrantPermissionsProps = {
  permissionHandler?: PermissionHandler;
  permissions?: PermissionDataType[];
  description?: string;
  icon?: string;
  onComplete?: (grantedPermissions: Record<PermissionType, boolean>) => void;
  onCancel?: () => void;
  screenStep1: React.ReactElement;
  screenStep2?: React.ReactElement;
  screenStep3?: React.ReactElement;
  defaultStep2: { image: string; title: string; titleNextStep: string };
  defaultStep3: {
    image: string;
    title: string;
    adsComponent: React.ReactElement;
    titleNextStep: string;
    descNextStep?: string;
  };
  isPermission: boolean;
};

export const GrantPermissions = (props: GrantPermissionsProps) => {
  const [state, setState] = React.useState<{
    step: number;
    permissions: Record<PermissionType, boolean>;
  }>({
    step: 1,
    permissions:
      props.permissions?.reduce(
        (acc, permission) => ({
          ...acc,
          [permission.key]: false,
        }),
        {} as Record<PermissionType, boolean>
      ) || {},
  });

  const defaultRequestPermission = async (
    permission: string
  ): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(permission as any);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // iOS permission handling logic here
        Alert.alert(
          'Permission handling for iOS is not implemented in this example.'
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestPermission = props.permissionHandler || defaultRequestPermission;

  const handlePermissionToggle = async (permissionData: PermissionDataType) => {
    const permissionString =
      Platform.OS === 'android'
        ? permissionData.androidPermission
        : permissionData.iosPermission;

    if (!permissionString) {
      console.warn(
        `No permission string provided for ${permissionData.key} on ${Platform.OS}`
      );
      return;
    }

    const granted = await requestPermission(permissionString);

    setState((prevState) => ({
      ...prevState,
      permissions: {
        ...prevState.permissions,
        [permissionData.key]: granted,
      },
    }));
  };

  const header = (title: string) => {
    return (
      <SafeAreaView
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'blue',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginVertical: 10,
          }}
          size={20}
          numberOfLines={2}
        >
          {title || '123123123123'}
        </Text>
      </SafeAreaView>
    );
  };

  const screenStep1 = () => {
    return (
      <View flex1 style={{ position: 'relative' }}>
        <SafeAreaView
          style={{
            backgroundColor: 'transparent',
            zIndex: 9999,
            flex: 1,
            alignItems: 'flex-end',
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props?.isPermission
                ? props?.onCancel
                : setState((pre) => ({ ...pre, step: 2 }))
            }
          >
            <IconClose resizeMode="contain" width={20} />
          </TouchableOpacity>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {props?.screenStep1}
        </View>
      </View>
    );
  };

  const screenStep2 = () => {
    return (
      <View flex1 bgColor={'white'}>
        {props?.screenStep2 ? (
          props?.screenStep2
        ) : (
          <>
            {header(props?.defaultStep2?.title)}
            <Image
              src={
                props?.defaultStep2?.image ||
                'https://picsum.photos/200/300?random=5'
              }
              style={{ flex: 1 }}
              resizeMode="cover"
            />
          </>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 10,
          }}
        >
          <View
            height={140}
            width={'100%'}
            bgColor={'white'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 22,
              paddingVertical: 40,
            }}
          >
            <TouchableOpacity
              onPress={() => setState((pre) => ({ ...pre, step: 3 }))}
              style={{
                backgroundColor: COLOR.hex_EA7000,
                borderRadius: 18,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text size={18} style={{ fontWeight: 'bold' }} color="white">
                {props?.defaultStep2?.titleNextStep}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const screenStep3 = () => {
    return (
      <View bgColor={'white'} flex1>
        {props?.screenStep3 ? (
          props?.screenStep3
        ) : (
          <View center flex1>
            {header(props?.defaultStep3?.title)}
            <Image
              src={
                props?.defaultStep3?.image ||
                'https://picsum.photos/200/300?random=3'
              }
              style={{
                justifyContent: 'center',
                width: P.WidthScale(314),
                height: P.WidthScale(314),
              }}
              resizeMode="cover"
            />
            <View
              style={{ width: '100%', paddingHorizontal: 20, marginTop: 20 }}
            >
              {props.permissions?.map((permission) => (
                <View
                  key={permission.key}
                  row
                  bgColor={'#EDEDED'}
                  borderColor={'#AAAAAA'}
                  paddingHorizontal={20}
                  paddingVertical={16}
                  borderRadius={13}
                  borderWidth={1}
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 15,
                  }}
                >
                  <Text
                    size={24}
                    style={{ fontWeight: '500' }}
                    color={COLOR.dark}
                  >
                    {permission.label}
                  </Text>
                  <Switch
                    trackColor={{ false: '#123123', true: '#2222' }}
                    thumbColor={COLOR.hex_EA7000}
                    value={state.permissions[permission.key] || false}
                    onValueChange={() => handlePermissionToggle(permission)}
                  />
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => props.onComplete?.(state.permissions)}
            >
              <View>
                <Text
                  lineHeight={28}
                  size={28}
                  style={{ fontWeight: 'bold' }}
                  color={COLOR.dark}
                >
                  {props?.defaultStep3?.titleNextStep}
                </Text>
                <Text
                  lineHeight={11}
                  size={11}
                  style={{ fontWeight: 'bold' }}
                  color={COLOR.dark40}
                >
                  {props?.defaultStep3?.descNextStep}
                </Text>
              </View>
              <IconArrowRight
                resizeMode="contain"
                height={20}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
            <View
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
              height={300}
              bgColor={'red'}
            >
              {props?.defaultStep3?.adsComponent}
            </View>
          </View>
        )}
      </View>
    );
  };

  const showScreen = () => {
    if (props?.isPermission) {
      return screenStep1();
    }
    switch (state?.step) {
      case 1:
        return screenStep1();
      case 2:
        return screenStep2();
      case 3:
        return screenStep3();
      default:
        return screenStep1();
    }
  };
  return <>{showScreen()}</>;
};
