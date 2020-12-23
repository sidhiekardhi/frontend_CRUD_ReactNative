import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Image,
  Alert,
  StyleSheet
} from "react-native";
import axios from "axios";
import qs from "qs";
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';

const EditData = ({ route, navigation }) => {
  const [id, setId] = useState("")
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jurusan, setJurusan] = useState("");
  const { itemId, itemNama, itemAlamat, itemJurusan, itemImage } = route.params;
  const [imagePicture, setimagePicture] = useState(`http://192.168.43.91/CI-tes/uploads/${itemImage}`);
  const [users, setUsers] = useState([]);
  
  const update  =() => {
    let file = {
        uri: imagePicture, 
        type: 'image/jpg', 
        name: imagePicture
};
    const data = new FormData();
    data.append('id', itemId)
    data.append('nama', nama);
    data.append('alamat', alamat);
    data.append('jurusan', jurusan);
    data.append('image', file);

    console.log("ini form data :", data);
    console.log("ini form data :", file.uri);

    
    axios.post("http://192.168.43.91/CI-tes/api/mahasiswas/update", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
            .then(function (response) {
              alert(JSON.stringify(response))
            })
            .catch(function (error) {
              alert(error)
              console.log(error);
            });
}

const takePhotoFromCamera = async()=> {
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        compressImageMaxHeight: 300,
        compressImageMaxWidth: 400,
        compressImageQuality: 0.5,
        mediaType: 'photo',
      }).then(image => {
        console.log(image);
        console.log(image.path);
        setImage(image)
      });
}
const chooseFotoFromLibrary = async()=> {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        console.log("image path  :  ", image.path);
        setimagePicture(image.path)
      });
}

  // const update = () => {
  //   const dataa = {
  //     id: itemId,
  //     nama,
  //     alamat,
  //     jurusan
  //   };
  //   console.log(dataa.id);
  //   axios
  //     .post(
  //       "http://192.168.43.91/CI-tes/api/mahasiswas/update",
  //       qs.stringify(dataa)
  //     )
  //     .then(function (response) {
  //       alert(JSON.stringify(response));
  //     })
  //     .catch(function (error) {
  //       alert(error);
  //       console.log(dataa);
  //       console.log(error);
  //     });
  // };


  useEffect(() => {
    getData();
},[]);

const getData = () => {
  axios.get(`http://192.168.43.91/CI-tes/api/mahasiswas/getId/${itemId}`)
  .then(res => {
      const mahasiswa= res.data.data;
      console.log("tes : "+JSON.stringify(res.data.data));
      setUsers(mahasiswa);
  })
}


  return (
    <View>
      <Text style={{ textAlign: "center", margin: 10 }}>  
        Form Input Mahasiswa
      </Text>
      {users.map((mahasiswa) => {
                return (
                  <View>
                  <TextInput
                  style={{ borderWidth: 1, marginBottom: 5 }}
                  value={mahasiswa.id}
                  key={mahasiswa.id}
                   onChangeText={(text) => setId(text)}
                >
                  
                 
                </TextInput>
                <TextInput
                  style={{ borderWidth: 1, marginBottom: 5 }}
                  onChangeText={(text) => setNama(text)}
                  >
                   {mahasiswa.nama}
                </TextInput>
                <TextInput
                  style={{ borderWidth: 1, marginBottom: 5 }}
                  onChangeText={(text) => setAlamat(text)}
                  >
                  {mahasiswa.alamat}
                </TextInput>
                <TextInput
                  style={{ borderWidth: 1, marginBottom: 5 }}
                  onChangeText={(text) => setJurusan(text)}
                  >
                  {mahasiswa.jurusan}
                </TextInput>
                <View style={{flexDirection: 'row'}}> 
                <Image
                style={{margin:10, width: 100, height: 100, marginLeft: 20, marginTop:10}}
                source={{uri: imagePicture}} />
                <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, textAlign:'center', marginTop: 20}} 
                onPress={chooseFotoFromLibrary}>
                  Ganti Gambar
                  </Text>
                </View>
                </View>   
                       )
                })}
      <TouchableHighlight onPress={update} style={styles.btnSimpan}>
        <Text style={styles.textBtn}>UPDATE</Text>
      </TouchableHighlight>
    </View>
  );
};

export default EditData;

const styles = StyleSheet.create({
  btnSimpan: {
    backgroundColor: "lightblue",
    padding: 10,
    alignItems: "center"
  },
  textBtn: {
    fontSize: 20,
    color: "white"
  },
  delete: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginRight: 10
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  desc: {
    marginLeft: 18,
    flex: 1
  }
});
