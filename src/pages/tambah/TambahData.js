import React, {useState, PureComponent} from 'react';
import {View, Text, TextInput, TouchableHighlight,Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import axios from 'axios'
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import qs from 'qs'



const Home = ({navigation}) => {
        const [id, setId] =useState("");
        const [nama, setNama] =useState("");
        const [alamat, setAlamat] =useState("");
        const [jurusan, setJurusan] =useState("");
        const [cameraRef, setCameraRef] = useState(null);
        const [image, setImage] =useState("https://cdn-image.hipwee.com/wp-content/uploads/2020/06/hipwee-chelsea-islan-imbau-pemuda-tak-golput-800-2019-04-08-142033_0-750x422.jpg");


        const GoTo = () => {
            navigation.navigate("List Data");
        }
        const simpan  =() => {
            let file = {
                uri: image.path, 
                type: 'image/jpg', 
                name: "imagename.jpg"
      };
            const data = new FormData();
            data.append('nama', nama);
            data.append('alamat', alamat);
            data.append('jurusan', jurusan);
            data.append('image', file);

            console.log("ini form data :", data);
            console.log("ini form data :", file.uri);

            
            axios.post("http://192.168.43.91/CI-tes/api/mahasiswas/tambah", data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
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

    // var photo = {
    //     uri: IMAGE_PATH,
    //     type: 'image/jpeg',
    //     name: 'photo.jpg',
    // };
    
    // //use formdata
    // var formData = new FormData(); 
    // //append created photo{} to formdata
    // formData.append('image', photo);
    // //use axios to POST
    // axios({
    //     method: 'POST',
    //     url: api_url +  'customer/upload-avatar',
    //     data: formData,
    //     headers: {
    //         'Authorization': "Bearer  "  +  YOUR_BEARER_TOKEN,
    //         'Accept': 'application/json',
    //         'Content-Type': 'multipart/form-data;'    
    //     }}) .then(function (response) { console.log(response)})
    //     .catch(function (error) { console.log(error.response)
    // });

          const takePicture = async () => {
            try {
                const options = { quality: 0.5, base64: true };
                const data = await cameraRef.current.takePictureAsync(options);
                console.log(data.uri, '<<<<<<<<<<<<<<<<<<<<<');
            } catch (error) {
                console.log(error, "ERROR <<<<<<<<<<<<<")
            }
        };

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
                setImage(image.path)
              });
        }
    


    return (
        <View>
                <Text style={{textAlign: 'center', margin: 10}}> Form Input Mahasiswa</Text>
                <TextInput placeholder="Masukkan Nama" style={{borderWidth: 1, marginBottom: 5}} value={nama} onChangeText={(value) => setNama(value)}></TextInput>
                <TextInput placeholder="Masukkan alamat" style={{borderWidth: 1, marginBottom: 5}}value={alamat} onChangeText={(value) => setAlamat(value)}></TextInput>
                <TextInput placeholder="Masukkan Jurusan" style={{borderWidth: 1, marginBottom: 5}}value={jurusan} onChangeText={(value) => setJurusan(value)}></TextInput>
                <RNCamera
           ref={cameraRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />

         <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity  onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
                <Image source={{uri: image}} style={{height: 150, width: 150, borderColor: 'red'}}></Image>
                <TouchableHighlight onPress={takePhotoFromCamera} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >Take Picture</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={chooseFotoFromLibrary} style={styles.btnSimpan}>
                <Text style={styles.textBtn} >chooseFotoFromLibrary</Text>
                </TouchableHighlight>
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
        marginTop: 10,
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
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
})