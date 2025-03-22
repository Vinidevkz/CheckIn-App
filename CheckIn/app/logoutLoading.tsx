import { useEffect, useState } from "react";
import {View} from 'react-native'

import colors from "@/src/styles/colors";
//components
import Loading from "@/src/components/loading";

import { useRouter } from "expo-router";

export default function LogoutLoading(){

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        router.replace("/");
        setIsLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return <View style={{backgroundColor: colors.background}}><Loading isLoading={isLoading} /></View>;
}