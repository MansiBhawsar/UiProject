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
  <Card  key={i} style={{  lineSpacingMultiplier:'2.5',
                           marginTop:0.0,
                          //  backgroundColor:"white",
                           borderWidth:0.1,
                           borderRadius:0.5,
                           }}> 
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
<CardContent
 text={p.skills}
 textStyle={styles.setskills}
/>
{/* <CardContent
 text={p.appliedCount}
 textStyle={styles.setskills}
/> */}
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
  backgroundColor:"white",
  },

  setBorder:{
    marginLeft:20,
    marginTop:25,
    width:"17%",
    height:"40%",
    borderWidth: 1,
    borderRadius:5,
    // shadowRadius:5
    borderColor: 'white',
    shadowRadius: 30,
    shadowOpacity: 0.5,
    shadowOffset: { height: 2},
    shadowColor: "white",
    position: 'absolute' ,
    borderWidth:0.1
    },

  setFontSizeOne:{
    marginLeft:100,
    marginTop:10,
    fontSize:16,
    fontWeight:"bold",
   
  },
  subtitle:{
    marginLeft:100,
    fontSize:12,
    fontWeight: "bold",
    
    },

  setContent:{
    marginLeft:100,
    fontSize:10,
    fontWeight:"300",
    
  },
  setskills:{
    marginLeft:100,
    fontSize:10,
    fontWeight:"300"

  }
});

