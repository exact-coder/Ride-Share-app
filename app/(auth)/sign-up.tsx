import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import OAuth from '@/components/OAuth';

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const onSignUpPress = async () => {
    Alert.alert("You press the Signup Button")
  };
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
        
        {/* Verification */}
      </View>
    </ScrollView>
  )
}

export default SignUp;