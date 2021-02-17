import { SearchBar } from 'react-native-elements';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView,Button,Footer,FooterTab} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards';
import axios from 'axios';
import CardImage from './data';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

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
      containerStyle={{backgroundColor:"white"}}
      leftIconContainerStyle={{
        backgroundColor:"white"
             }}
      inputContainerStyle={{backgroundColor:"white"}}
      placeholder="Find Jobs here....."
      value={search}
      onChangeText={updateSearch}
      />
     
      <View style={{flexDirection:"row",
                    justifyContent:"space-between",
                    color:"grey",
                    marginLeft:10
                  }}>
        <TextInput style={{color:"grey",fontWeight:"500",fontSize:13}}>Recommend Job</TextInput>

        <View style={{flexDirection:"row"
                     }}>
         <Icon style={styles.searchIcon} name="sort" size={13} color="#000"/>
          <TextInput style={{color:"#0070BB",
                             fontSize:13
                            }}>Sort</TextInput>
          <Ionicons style={styles.Ionicons} name="md-filter" size={13} color="#000"/>
          <TextInput style={{ color:"#0070BB",
                              fontSize:13
                           }}>Filter</TextInput>
        </View>
        </View>
     {
       
  posts.map((p,i)=>{
      // console.log(p);

  return(
  <Card  key={i}> 
  <View style={styles.job}>
  <View style={styles.companyLogo}>
  <View style={styles.logoWrapper}>
  <CardImage 
  singleLineTitle="true"
  source={{uri:"https://expertrons-v2.s3.ap-south-1.amazonaws.com/"+p.companyId.image}} 
  style={styles.setBorder}
     />
  </View>
  </View>

 <View style={styles.content}>
  <CardTitle 
    title={p.title} 
    titleStyle={styles.setFontSizeOne}
    subtitle={`${p.companyId.name} in ${p.location[0].countryId.name}`}
    subtitleStyle={styles.subtitle}
  />
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

<CardContent
 text={p.appliedCount ? "Be an early applicant": "Viewed"}
 textStyle={styles.count}
/>

<CardContent
 text={p.isApplied ? "Applied": "Easy Apply"}
 textStyle={styles.applied}
/>

</View>
</View>
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
  backgroundColor:"white"
  
  },
  searchIcon: {
    padding: 10,
    color:"#0070BB",
    marginTop:6
},
Ionicons:{
  padding: 10,
  color:"#0070BB",
  marginTop:6
},
  job:{
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    // elevation: 1,
    marginLeft: 0.1,
    marginRight: 0.1,
    marginTop: 0.1,
    marginBottom:0.1
      },
  content:{
      flex: 3,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white"
           },

  setFontSizeOne:{
    // flex: 1,
    // marginLeft:100,
    // marginTop:10,
    // fontSize:16,
    // fontWeight:"bold",
      flex: 1,
      fontSize: 15,
      fontWeight: "700",
      },

  subtitle:{
    // marginLeft:100,
    // fontSize:12,
    // fontWeight: "bold",
      flex: 1,
      fontSize: 12,
      fontWeight: "bold",
      color: "grey"
          },

  setContent:{
    // marginLeft:100,
       fontSize:12,
       fontWeight:"300",
            },
  setskills:{
    // marginLeft:100, 
    // fontSize:10,
    // fontWeight:"300"
       flex: 1,
       fontSize: 10,
       fontWeight: "300",
       color: "grey",
       width:"100%"
          },
  applied:{
        flex: 1,
        fontSize: 8,
        fontWeight: "300",
        color: "#0070BB"
        },
  count:{
        flex: 1,
        fontSize: 8,
        fontWeight: "300",
        color: "#0070BB"
  }
});

