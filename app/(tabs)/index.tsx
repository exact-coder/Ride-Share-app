import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1 items-center justify-center text-center'>
      <Text className={"text-rose-600  font-extrabold bg-blue-500"} >
      Hello, We are building RIDE SHARE APP
    </Text>
    </SafeAreaView>
  );
}


