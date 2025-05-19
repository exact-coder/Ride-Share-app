import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link, useRouter } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignIn } from '@clerk/clerk-expo';

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter()

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(root)/(tabs)/home')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      Alert.alert("Error", (err as any)?.errors?.[0]?.longMessage);
    }
  }
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Wellcome👋👋
          </Text>
        </View>

        <View className='p-5'>
          <InputField 
            label={"Email"}
            placeholder="Enter Your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({...form, email: value})}
          />
          <InputField 
            label={"Password"}
            placeholder="Enter Your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({...form, password: value})}
          />
          <CustomButton title='Sign In' onPress={onSignInPress} className='mt-6' />

          {/* OAuth */}
          <OAuth/>

          <Link href={"/(auth)/sign-up"} className='text-lg text-center text-general-200 mt-10'>
            <Text > Don't have an account? </Text> {" "}
            <Text className='text-primary-500'>Sign Up</Text>
          </Link>
        </View>
        
        {/* Verification */}
      </View>
    </ScrollView>
  )
}

export default SignIn;

