import React, {useState} from 'react';
import {View, Text, TextInput, TouchableHighlight,Button, StyleSheet} from 'react-native';
import axios from 'axios'
import qs from 'qs'



const Home = ({navigation}) => {
        const [id, setId] =useState("");
        const [nama, setNama] =useState("");
        const [alamat, setAlamat] =useState("");
        const [jurusan, setJurusan] =useState("");

        const GoTo = () => {
            navigation.navigate("List Data");
        }
        const simpan  =() => {
            const data = {
                nama,
                alamat,
                jurusan
            }
            axios.post("http://192.168.43.91/CI-tes/api/mahasiswas/tambah", data)
                    .then(function (response) {
                      alert(JSON.stringify(response))
                      setNama("");
                      setAlamat("");
                      setJurusan("");
                    })
                    .catch(function (error) {
                      alert(error)
                      console.log(error);
                    });
        }


    return (
        <View>
                <Text style={{textAlign: 'center', margin: 10}}> Form Input Mahasiswa</Text>
                <TextInput placeholder="Masukkan Nama" style={{borderWidth: 1, marginBottom: 5}} value={nama} onChangeText={(value) => setNama(value)}></TextInput>
                <TextInput placeholder="Masukkan alamat" style={{borderWidth: 1, marginBottom: 5}}value={alamat} onChangeText={(value) => setAlamat(value)}></TextInput>
                <TextInput placeholder="Masukkan Jurusan" style={{borderWidth: 1, marginBottom: 5}}value={jurusan} onChangeText={(value) => setJurusan(value)}></TextInput>
                <TouchableHighlight onPress={simpan} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >Simpan</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={GoTo} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >Lihat Data</Text>
                </TouchableHighlight>
        </View>
    )
}

export default Home;

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