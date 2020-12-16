import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  StyleSheet
} from "react-native";
import axios from "axios";
import qs from "qs";

const EditData = ({ route, navigation }) => {
  const [id, setId] = useState("")
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jurusan, setJurusan] = useState("");
  const { itemId, itemNama, itemAlamat, itemJurusan } = route.params;

  const update = () => {
    const dataa = {
      id : itemId,
      nama : itemNama,
      alamat,
      jurusan
    };
    axios
      .post(
        "http://192.168.43.91/CI-tes/api/mahasiswas/update",
        qs.stringify(dataa)
      )
      .then(function (response) {
        alert(JSON.stringify(response));
      })
      .catch(function (error) {
        alert(error);
        console.log(dataa);
        console.log(error);
      });
  };

  useEffect(() => {
    setId({itemId});
    setNama({itemNama});
    setAlamat({itemAlamat});
    setJurusan({itemJurusan});
    console.log(itemId+" , " +itemNama)
},[]);

  return (
    <View>
      <Text style={{ textAlign: "center", margin: 10 }}>
        {" "}
        Form Input Mahasiswa
      </Text>

      <TextInput
        placeholder="Masukkan ID"
        style={{ borderWidth: 1, marginBottom: 5 }}
        value={id}
        onChangeText={(value) => setId(value)}
      >
        {/* {" "}
        {itemId} */}
      </TextInput>
      <TextInput
        placeholder="Masukkan Nama"
        style={{ borderWidth: 1, marginBottom: 5 }}
        value={nama}
        onChangeText={(value) => setNama(value)}
      >
        {/* {" "}
        {itemNama} */}
      </TextInput>
      <TextInput
        placeholder="Masukkan alamat"
        style={{ borderWidth: 1, marginBottom: 5 }}
        value={alamat}
        onChangeText={(value) => setAlamat(value)}
      >
        {/* {itemAlamat} */}
      </TextInput>
      <TextInput
        placeholder="Masukkan Jurusan"
        style={{ borderWidth: 1, marginBottom: 5 }}
        value={jurusan}
        onChangeText={(value) => setJurusan(value)}
      >
        {/* {itemJurusan} */}
      </TextInput>
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
