import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, Button, Image, Alert, TouchableOpacity } from 'react-native'
import CardView from 'react-native-cardview'

const FormTambah = ({nama, alamat, jurusan, onPress, onDelete}) => {
    return (
        <CardView
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
        margin={10}>
        <View style={styles.itemContainer}>
        <Image source=""></Image>
        <View style={styles.desc}>
            <TouchableOpacity onPress={onPress}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nama Lengkap : {nama}</Text>
            </TouchableOpacity>
            <Text>Alamat Lengkap : {alamat}</Text>
            <Text>Jurusan Lengkap: {jurusan}</Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>X</Text>

        </TouchableOpacity>
    </View>
  </CardView>
      
    )
}

export default FormTambah;

const styles = StyleSheet.create({
    btnSimpan:{
        backgroundColor: 'lightblue',
        padding: 10,
        alignItems: 'center'
      },
      textBtn : {
        fontSize :20,
        color : 'white'
      },
      delete : {
          fontSize: 20,
          fontWeight : 'bold',
          color : 'red',
          marginRight:10
      },
      itemContainer : {
          flexDirection:'row',
          marginBottom:20
      },
      desc : {
          marginLeft:18,
          flex:1
      }
})