import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Feather, MaterialCommunityIcons as Icon, MaterialIcons } from "@expo/vector-icons";
import { inserir, remover } from "../config/database";
import { globalStyles } from "../styles/globalStyles";

export default function Home({ navigation }) {

  const [musicas, setMusicas] = useState([]);

  const escolherMusica = async () => {
    const resultado = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
      multiple: true,
    });

    if (!resultado.canceled) {
      const selecionadas = resultado.assets.map((arq) => ({
        id: arq.uri,
        nome: arq.name,
        uri: arq.uri,
      }));
      setMusicas([...musicas, ...selecionadas]);
    }
  };

  // Função para enviar as músicas selecionadas para a playlist
  const enviarParaPlaylist = async () => {
    try {
      for (const musica of musicas) {
        await inserir(musica.nome, musica.uri);
      }
      setMusicas([]); // limpa a seleção
      navigation.navigate("PlayList"); // vai para a playlist
    } catch (error) {
      console.error("Erro ao enviar músicas para a playlist:", error);
    }
  };

  return (
    <ImageBackground
      source={require('../images/fundo-de-luzes-gradientes.jpg')}
      style={globalStyles.container}
    >
      <View style={globalStyles.header}>
        <TouchableOpacity
          style={globalStyles.backButton}
          onPress={() => BackHandler.exitApp()} // fechar o app
        >
          <Feather name="x" size={26} color="#fff" /> 
        </TouchableOpacity>

        <Text style={globalStyles.title}>Home</Text>

        <View>
          <Image
            source={require('../images/9037310.jpg')}
            style={globalStyles.profileImage}
          />
        </View>
      </View>

      <View style={styles.topArea}>
        <TouchableOpacity onPress={escolherMusica}>
          <View style={styles.choiceButton}>
            <View style={styles.iconContainer}>
              <Icon name="file-music" size={32} color="#000000ff" />
              <MaterialIcons name="add-circle" size={20} color="#fff" style={styles.addIcon} />
            </View>
            <Text style={styles.addButtonText}>Adicionar Músicas</Text>
            <Text style={styles.addButtonSubtext}>Clique para selecionar arquivos de áudio</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          data={musicas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={require('../images/setMusica.jpg')}
                style={styles.cardImage}
              />
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.musicInfo}
                  onPress={async () => await inserir(item.nome, item.uri)}
                >
                  <Text style={styles.musicText} numberOfLines={3} ellipsizeMode="tail">
                    {item.nome}
                  </Text>
                  <View style={styles.addMusicButton}>
                    <Icon name="play-circle" size={40} color="#6a11cb" />
                    <Text style={styles.musicText}>
                      Adicionar
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    remover(item.id);
                    setMusicas(musicas.filter((musica) => musica.id !== item.id));
                  }}
                >
                  <Feather name="trash" size={20} color="#ffffffff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.bottomArea}>
        <TouchableOpacity
          onPress={enviarParaPlaylist} // chama a função que envia e limpa
          style={styles.checkButton}
        >
          <Icon name="check" size={28} color="#070000ff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  topArea: {
    flex: 1,
    padding: 15,

  },
  bottomArea: {
    paddingBottom: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  addIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#000000ff',
    borderRadius: 10,
  },

  choiceButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 8,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: "rgba(255, 255, 255, 0.73)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 1)",
  },
  addButtonSubtext: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 12,
  },
  addButtonText: {
    color: "#000000ff",
    fontSize: 24,
    fontWeight: "bold",
  },
  checkButton: {
    padding: 20,
    backgroundColor: "#ee101044",
    borderColor: "rgba(255, 0, 0, 0.6)",
    borderRadius: 50,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 15,
    overflow: "hidden",
    maxWidth: "48%",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",

  },
  cardImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    backgroundColor: "#dd57c7c9",
    padding: 5,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f5f5f5",
  },
  addMusicButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "space-evenly",
  },
  listContainer: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 40,
    marginBottom: 10,
    borderRadius: 8,
  },
  musicInfo: {
    flex: 1,
    marginRight: 10,

  },
  musicText: {
    fontSize: 14,
    color: "#8a7cbdff",
    fontWeight: "600",
    textAlign: "center",

  },
  removeButton: {
    position: "absolute",
    top: -130,
    right: 8,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 6,
    borderRadius: 20,
  },
  removeButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});