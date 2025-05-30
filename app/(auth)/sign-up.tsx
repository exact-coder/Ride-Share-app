import { View, Text, ScrollView, Image, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link, useRouter } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: ''
  })

  const router = useRouter()

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress : form.email,
        password: form.password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      })
    } catch (err) {
      Alert.alert("Error", (err as any)?.errors?.[0]?.longMessage);
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (signUpAttempt.status === 'complete') {
        // TODO: Create a database user!
        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification( {...verification, state: "success"})
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        });
      }
    } catch (err) {
      setVerification({
          ...verification,
          error: (err as any)?.errors?.[0]?.longMessage || "Verification Failed",
          state: "failed",
        });
    }
  }

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250]' />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Create Your Account
          </Text>
        </View>

        <View className='p-5'>
          <InputField 
            label={"Name"}
            placeholder="Enter Your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({...form, name: value})}
          />
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
          <CustomButton title='Sign Up' onPress={onSignUpPress} className='mt-6' />

          {/* OAuth */}
          <OAuth/>

          <Link href={"/(auth)/sign-in"} className='text-lg text-center text-general-200 mt-10'>
            <Text > Already have an account? </Text> {" "}
            <Text className='text-primary-500'>Log In</Text>
          </Link>
        </View>
        
        {/* Verification Modal */}
        <ReactNativeModal isVisible={verification.state === "pending"} onModalHide={()=> setVerification({...verification, state: "success"})}>
          <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>

            <Text className='text-2xl font-JakartaBold mb-2'> Verification </Text>

            <Text className='font-Jakarta mb-5'>
              We'hv sent a verification code to {form.email}
            </Text>
            <InputField label='Code' icon={icons.lock} placeholder='123456' value={verification.code} keyboardType='numeric' onChangeText={(code) => setVerification({...verification, code})}/>

            {verification.error && (
              <Text className='text-red-500 text-sm mt-1'>
                {verification.error}
              </Text>
            )}
            <CustomButton title='Verify Email' onPress={onVerifyPress} className='mt-5 bg-success-500'/>
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
            <Image source={images.check} className='w-[110px] h-[110px] mx-auto my-5' />
            <Text className='text-3xl font-JakartaBold text-center'> Verified</Text>

            <Text className='text-base text-gray-400 font-Jakarta text-center mt-2'>
              You have successfully verified your account.
            </Text>
            <CustomButton title='Browse Home' onPress={() => router.replace("/(root)/(tabs)/home")} className='mt-5'/>
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  )
}

export default SignUp;