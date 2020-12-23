import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import { FlatList, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import axios from 'axios'
import { FormTambah } from '../../Component/component';

const ListData = ({navigation}) => {
    const [id, setId] =useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getData();
    },[]);

    const selectItem = (item) => {
        console.log( "select item" + item)
        setSelectedUser(item);
        navigation.navigate("Edit Data",  {
            itemId: item.id,
            itemNama: item.nama,
            itemAlamat: item.alamat,
            itemJurusan : item.jurusan,
            itemImage : item.image
          });
        // setId(item.id);
        // setNama(item.nama);
        // setAlamat(item.alamat);
        // setJurusan(item.jurusan);
        // setButton("Update");
    }

   

    const getData = () => {
        axios.get("http://192.168.43.91/CI-tes/api/mahasiswas/")
        .then(res => {
            const mahasiswa= res.data.data;
            console.log("tes : "+res.data.data);
            setUsers(mahasiswa);
            Alert.alert("tes data"+res.data.data);

        })
    }
    const deleteItem = (item) => {
        console.log(item)
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

    return (
        <ScrollView>
            
        
             {users.map((mahasiswa) => {
                return (
                        <FormTambah 
                        key={mahasiswa.id} 
                        nama={mahasiswa.nama} 
                        alamat={mahasiswa.alamat} 
                        jurusan={mahasiswa.jurusan}
                        imagePicture={`http://192.168.43.91/CI-tes/uploads/${mahasiswa.image}`} 
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
                        > </FormTambah>     
                        
                       )
                })}
                </ScrollView>
          )
        }
  

export default ListData;

