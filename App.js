import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import axios from 'axios';

export default function App() {
  const [posts,setposts]=useState([])
  useEffect(()=>{
    axios.post("https://testexpapp.expertrons.com/api/jobs/app/get-jobs",{
   textSearch:"",
    page:1
  },{
    headers:{
      authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGQ4N2FhOThiZDI5NTk0ODhjNmU5NiIsInVzZXJUeXBlIjoxLCJpYXQiOjE1ODYzMzM2MjMsImV4cCI6MTYxNzg2OTYyM30.J0n8wl8YBHE3emWl6VkIouPaZQHAiua_HREETZSiKBo"
    }
  }).then((res)=>{
    // console.log(JSON.stringify(res.data.data.data));
    setposts(res.data.data.data)
  })
  },[posts])
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
     
    {
    posts.map((p)=>{
      // console.log(p);
    return(
  <Card>
  <CardImage 
    source={{uri: 'p.companyId.image'}} 
    style = {{ width: 100, height: 100 }}
  />
  <CardTitle 
    title={p.title} 
    subtitle="This is subtitle"
   />
  <CardContent text="Mumbai, Pune, Ranchi, Delhi."/>
  </Card>
 );
})
}
</ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    flex: 1,
    backgroundColor: '#fff'
    
  },
});
