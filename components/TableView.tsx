import React from "react";
import { View, Text, StyleSheet } from 'react-native';


const tloop = ()=>{
    let m =30
    let element=[]
    for (let i = 2; i <= m; i++) {
      element.push(
      <View style={styles.table_body} key={i}>
                  
      <View style={{width:100}}><Text style={styles.table_data}>{i}</Text></View>
      <View style={{width:100}}><Text style={styles.table_data}>krish</Text></View>
      <View style={{width:110}}><Text style={styles.table_data}>smartphone</Text></View>
      <View style={{width:40}}><Text style={styles.table_data}>70000</Text></View>
    
  </View>)
      
    }
    return element;
  }

const TableView=()=>{
    return(
    <View style={{justifyContent:'center', alignItems:'center',flex:1, margin:10}} >
    <View style={{flexDirection:'row', backgroundColor:'#29FFD9',padding:10,paddingLeft:20,paddingRight:20}}>
        <View style={{width:100}}><Text style={styles.table_caption}>Sr no</Text></View>
        <View style={{width:100}}><Text style={styles.table_caption}>Name</Text></View>
        <View style={{width:110}}><Text style={styles.table_caption}>product</Text></View>
        <View style={{width:40}}><Text style={styles.table_caption}>Price</Text></View>
    </View>

    <View style={styles.table_body}>
          
            <View style={{width:100}}><Text style={styles.table_data}>1</Text></View>
            <View style={{width:100}}><Text style={styles.table_data}>krish</Text></View>
            <View style={{width:110}}><Text style={styles.table_data}>smartphone</Text></View>
            <View style={{width:40}}><Text style={styles.table_data}>70000</Text></View>
          
    </View>
  
  {tloop()}

</View>
);
}

const styles = StyleSheet.create({
    table_caption:{
         color:'#fff',
         fontWeight:'bold'
    },
    table_body:{
     flexDirection:'row',
     padding:10,
     paddingLeft:20,
     paddingRight:20
    },
    table_data:{
     fontSize:14
    }
   });
   export default TableView;
