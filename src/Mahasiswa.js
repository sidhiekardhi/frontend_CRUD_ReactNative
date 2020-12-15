import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, Button, Image, Alert } from 'react-native'
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { concat } from 'react-native-reanimated'
import axios from 'axios'
import qs from 'qs'
import CardView from 'react-native-cardview'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes'


const Item = ({nama, alamat, jurusan, onPress, onDelete}) => {
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

const Mahasiswa =() =>{
        const [id, setId] =useState("");
        const [nama, setNama] =useState("");
        const [alamat, setAlamat] =useState("");
        const [jurusan, setJurusan] =useState("");
        const [users, setUsers] = useState([]);
        const [button, setButton] = useState("Simpan");
        const [selectedUser, setSelectedUser] = useState({});
        
    useEffect(() => {
        getData();
    },[]);

    const selectItem = (item) => {
        console.log( "select item" + item)
        setSelectedUser(item);
        setId(item.id);
        setNama(item.nama);
        setAlamat(item.alamat);
        setJurusan(item.jurusan);
        setButton("Update");
    }

    const deleteItem = (item) => {
        console.log(item)
        const data = {
            id : item.id
        }
        axios.delete(`http://192.168.43.91/CI-tes/api/mahasiswas/delete/${item.id}`)
        .then(function (response) {
          alert(JSON.stringify(response))
          getData();
        })
        .catch(function (error) {
          alert(error)
          console.log(error);
        });
    }

    const simpan  =() => {
        const data = {
            nama,
            alamat,
            jurusan
        }
        // console.log(data)
        if(button === "Simpan"){
            axios.post("http://192.168.43.91/CI-tes/api/mahasiswas/tambah", data)
                .then(function (response) {
                  alert(JSON.stringify(response))
                  setNama("");
                  setAlamat("");
                  setJurusan("");
                  getData();
                })
                .catch(function (error) {
                  alert(error)
                  console.log(error);
                });
        } else if ( button === "Update"){
            const dataa = {
                id,
                nama,
                alamat,
                jurusan
            }
            axios.post("http://192.168.43.91/CI-tes/api/mahasiswas/update",qs.stringify(dataa))
                .then(function (response) {
                  alert(JSON.stringify(response))
                  setNama("");
                  setAlamat("");
                  setJurusan("");
                  getData();
                  setButton("Simpan")
                })
                .catch(function (error) {
                  alert(error)
                  console.log(dataa);
                  console.log(error);
                });
        }
    }

    const getData = () => {
        axios.get("http://192.168.43.91/CI-tes/api/mahasiswas/")
        .then(res => {
            console.log("tes data"+res.data.data);
            setUsers(res.data.data);
        })
    }

    
        return (
            <NavigationContainer>
                <Routes></Routes>
            {/* <ScrollView>

            <View>
                <Text style={{textAlign: 'center', margin: 10}}> Form Input Mahasiswa</Text>
                <TextInput placeholder="Masukkan Id" style={{borderWidth: 1, marginBottom: 5}} value={id} onChangeText={(value) => setId(value)}></TextInput>
                <TextInput placeholder="Masukkan Nama" style={{borderWidth: 1, marginBottom: 5}} value={nama} onChangeText={(value) => setNama(value)}></TextInput>
                <TextInput placeholder="Masukkan alamat" style={{borderWidth: 1, marginBottom: 5}}value={alamat} onChangeText={(value) => setAlamat(value)}></TextInput>
                <TextInput placeholder="Masukkan Jurusan" style={{borderWidth: 1, marginBottom: 5}}value={jurusan} onChangeText={(value) => setJurusan(value)}></TextInput>
                <TouchableHighlight onPress={simpan} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >{button}</Text>
                </TouchableHighlight>
                <View style={styles.line}/>
                <View>
                {users.map((mahasiswa, index) => {
                return (
                        <Item 
                        key={mahasiswa.id} 
                        nama={mahasiswa.nama} 
                        alamat={mahasiswa.alamat} 
                        jurusan={mahasiswa.jurusan} 
                        onPress={() => selectItem(mahasiswa)}
                        onDelete={() => Alert.alert('Peringatan', 'Apakah anda ingin menghapus data ini?', 
                        [
                            {
                                text: "Tidak", onPress: () => console.log("Button Tidak")
                            },
                            {
                                text: "Ya", onPress: () => deleteItem(mahasiswa)
                            },
                        ])}

                        ></Item>     
                        
                       )
                })}                    
                </View>
            </View>
            </ScrollView> */}
            </NavigationContainer>
        )
    }
export default Mahasiswa

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