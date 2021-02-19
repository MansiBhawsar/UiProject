import { SearchBar,ListItem,Avatar } from 'react-native-elements';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,SafeAreaView,FlatList} from 'react-native';
import { Card, CardTitle, CardContent} from 'react-native-material-cards';
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
  },[])

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
const renderItem = ({ item }) => {
        return ( 
          <ListItem bottomDivider style={{justifyContent:"flex-start"}} >
            <View style={{
                          display:"flex",
                          justifyContent:"flex-start",
                          flexDirection:"row",
                          }}>
            <View style={styles.imagestyle}>           
            <Avatar 
            avatarStyle={{flex:1,width:"100%"}}
            imageProps={{resizeMode: 'stretch'}}
            containerStyle={{ marginLeft:16,
                            }} 
              rounded={false} source={{uri:"https://expertrons-v2.s3.ap-south-1.amazonaws.com/"+item.companyId.image}} />
            </View>
             <ListItem.Content style={{flex:8}}>
             <ListItem.Title style={styles.setFontSizeOne}>
             {item.title} 
             </ListItem.Title>

             <ListItem.Subtitle style={styles.subtitle}>
             {`${item.companyId.name} in ${item.location[0].countryId.name}`}
             </ListItem.Subtitle>

             <Text style={styles.setContent}>
             {item.location.map((l)=>{
             return l.cityId.name
             }).join(",")}
             </Text>

             <Text style={styles.setskills}>
             {item.skills}
             </Text>
             {
               item.isApplied ?
               <Text style={styles.applied}>
                 Applied
               </Text>
               :
               <View> 
                 <View style={{
                   flexDirection:"row",
                  //  fontSize:5
                     }}>
                   <Text style={{fontSize:10,marginLeft:20,color:"#0070BB"}}>Be an early applicant</Text>
                   <Text style={{fontSize:10,marginLeft:20,color:"grey",marginRight:10}}>{new Date(item.createdAt).toDateString()}</Text>
                 </View>
                 {item.appliedCount ? <Text style={{fontSize:10,marginLeft:20,color:"#0070BB"}}>{item.appliedCount} Applicant</Text>:null}
               </View>
                  }

             <Text style={styles.count}>
             {item.isApplied ? "": "Easy Apply"}
             </Text>
             </ListItem.Content>
            </View>
           </ListItem>
          
        );
      };

  return (
    <SafeAreaView style={styles.container}>
     <View style={{
                 marginTop:10,
                 flexDirection:"row",
                 justifyContent:"space-between"
                
                 }}>
    <SearchBar 
     style={{
      backgroundColor:"white",
      }}
       lightTheme= {true}
        containerStyle={{backgroundColor : "white",
                         width:"84%"}}
        inputContainerStyle={{backgroundColor : "white"}}
       leftIconContainerStyle={{
        backgroundColor:"white",
                        //  margin:0
             }}
      inputContainerStyle={{backgroundColor:"white"}}
      placeholder="Find Jobs here....."
      value={search}
      onChangeText={updateSearch}
      />
      <View style={{width:"15%",    
                    height:"100%",                 
                     backgroundColor:"grey",
                     borderRadius:5,
                     borderColor:"grey",
                     marginBottom:10,
                     marginRight:10
                      }}>
       </View>
      </View>
      
      <View style={{flexDirection:"row",
                    justifyContent:"space-between",
                    color:"grey",
                    marginLeft:10,
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

       
        <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        />
     
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
  backgroundColor:"white"
  },
  imagestyle:{
    elevation: 1,
    backgroundColor: 'white',
    marginBottom: 60,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    marginLeft: 10,
    // marginRight: 10,
    // marginTop: 10,
    height:55,
    width:55,
    flex:2
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

  setFontSizeOne:{
    // flex: 1,
    // marginLeft:100,
    // marginTop:10,
    // fontSize:16,
    // fontWeight:"bold",
      flex: 1,
      fontSize: 15,
      fontWeight: "700",
      marginLeft:20,
      fontFamily: "Arial, Helvetica, sans-serif",
      
      },
  subtitle:{
    // marginLeft:100,
    // fontSize:12,
    // fontWeight: "bold",
      flex: 1,
      fontSize: 12,
      fontWeight: "bold",
      color: "grey",
      marginLeft:20,
      fontFamily: "Arial, Helvetica, sans-serif"
     
          },
  setContent:{
    // marginLeft:100,
       fontSize:12,
       fontWeight:"300",
       marginLeft:20,
       marginTop:5,
            },
  setskills:{
    // marginLeft:100, 
    // fontSize:10,
    // fontWeight:"300"
       flex: 1,
       fontSize: 10,
       fontWeight: "300",
       color: "grey",
       width:"100%",
       marginLeft:20,
       width:160,
       marginTop:5

          },
  applied:{
        flex: 1,
        fontSize: 8,
        fontWeight: "300",
        color: "#0070BB",
        marginLeft:20,
        marginTop:5
        },
  count:{
        flex: 1,
        fontSize: 8,
        fontWeight: "300",
        color: "#0070BB",
        marginLeft:20,
        marginTop:5
  },
});

