import { SearchBar } from 'react-native-elements';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView,Button,Footer,FooterTab,Icon} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import axios from 'axios';

export default function Jobs() {

  const [posts,setposts]=useState([])
  const [search,setsearch]=useState("")
 

 useEffect(()=>{
  callsearchapi()
  },[posts])

  const callsearchapi =()=>{
    axios.post("https://testexpapp.expertrons.com/api/jobs/app/get-jobs",{
      textSearch:search,
       page:1
     },{
       headers:{
         authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGQ4N2FhOThiZDI5NTk0ODhjNmU5NiIsInVzZXJUeXBlIjoxLCJpYXQiOjE1ODYzMzM2MjMsImV4cCI6MTYxNzg2OTYyM30.J0n8wl8YBHE3emWl6VkIouPaZQHAiua_HREETZSiKBo"
       }
     }).then((res)=>{
       // console.log(JSON.stringify(res.data.data.data));
       setposts(res.data.data.data)
     })
  }

  const updateSearch = (v) => {
      setsearch(v);
      callsearchapi();
      };
    
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <SearchBar 
      style={{
      backgroundColor:"white",
      }}
      placeholder="Find Jobs here....."
      value={search}
      onChangeText={updateSearch}
      />
     {
       
  posts.map((p,i)=>{
      // console.log(p);

  return(
  <Card  key={i}> 
  <View style={{
    flexDirection:'row', 
    flexWrap:'wrap',
    singleLineTitle:"true"
   }}>
  <CardImage 
  singleLineTitle="true"
  source={{uri:"https://expertrons-v2.s3.ap-south-1.amazonaws.com/"+p.companyId.image}} 
  style={styles.setBorder}
     />
  <CardTitle 
    title={p.title} 
    subtitle="This is subtitle"
    titleStyle={styles.setFontSizeOne}
    subtitleStyle={styles.subtitle}
    
   />
   </View>
   
  <CardContent  
 textStyle={styles.setContent}
  text={p.location.map((l)=>{
    return l.cityId.name
  }).join(",")}
 
  />
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
  marginTop:3,
  },

  setBorder:{
    borderRadius: 60,
    position: 'absolute',
    marginLeft:20,
    marginTop:28,
    width:"15%",
    height:"35%",
    borderRadius:50,
    borderColor: 'black'
  },

  setFontSizeOne:{
    marginLeft:80,
    marginTop:10,
    fontSize:16,
    fontWeight:"bold"
  },
  subtitle:{
    marginLeft:80,
    fontSize:12,
    fontWeight: "bold"

  },

  setContent:{
    marginLeft:82,
    fontSize:10,
    fontWeight:"300"
  }
});

