import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import ImportButton from '../components/menu/importButton';
import FolderCreator from '../components/menu/folderCreator';
import * as FileSystem from 'expo-file-system';
import MenuItem from '../components/menu/menuItem';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


class HomeScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        folderContent: null,
        folderName: 'notes',
        showCreateModal: false,
        showCreateFolderModal: false,
      };
  }

  handleViewNote(ref){
    if (ref === undefined) {
      ref = 'http://samples.leanpub.com/thereactnativebook-sample.pdf';
    }
    let type = ref.split('.').pop();
    this.props.navigation.navigate('ViewNote', {ref: ref, type: type});
  }

  getFolderContent = async () => {
    try {
      // Ruta de la carpeta cuyo contenido quieres obtener
      const folderPath = `${FileSystem.documentDirectory}/${this.state.folderName}`;
  
      // Obtener información sobre el contenido de la carpeta
      const folderContent = await FileSystem.readDirectoryAsync(folderPath);
  
      const itemsInfo = await Promise.all(
        folderContent.map(async (item) => {
          const itemPath = `${folderPath}/${item}`;

          const itemInfo = await FileSystem.getInfoAsync(itemPath);
          return { name: item, isDirectory: itemInfo.isDirectory };
        })
      );
  
      this.setState({ folderContent: itemsInfo });
      console.log('Contenido de la carpeta:', itemsInfo);
    } catch (error) {
      console.error('Error al obtener el contenido de la carpeta:', error);
    }
  };
  
  componentDidMount() {
    // crear la carpeta de notas si no existe
    const folderPath = `${FileSystem.documentDirectory}/notes`;
    FileSystem.getInfoAsync(folderPath).then(({ exists }) => {
      if (!exists) {
        FileSystem.makeDirectoryAsync(folderPath).then(() => {
          console.log('Carpeta creada');
        });
      }
    });
    this.getFolderContent();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.folderName !== this.state.folderName) {
      this.getFolderContent();
    }
  }

  render() {
      return (
          <View style={styles.container}>
              <View style={styles.superiorBar}>
                {this.state.folderName !== 'notes' && 
                <Button title="Atrás" onPress={() => {
                  const folderName = this.state.folderName.split('/');
                  folderName.pop();
                  this.setState({folderName: folderName.join('/')});
                }} />
                }
                <Text>Lista de Carpetas y Notas</Text>
                
              </View>
              {/* Aquí puedes mostrar la lista de carpetas y notas disponibles */}
              <View style={styles.itemContainer} >
              {this.state.folderContent && this.state.folderContent.map((item, index) => (
                <MenuItem 
                  key={index}
                  folderName={item.name}
                  notesCount={0}
                  isDirectory={item.isDirectory}
                  onPress={() => {
                    if (item.isDirectory) {
                      const newFolderPath = `${this.state.folderName}/${item.name}`;
                      this.setState({ folderName: newFolderPath });
                    } else {
                      console.log('Mostrar nota \n');
                      this.handleViewNote(`${FileSystem.documentDirectory}${this.state.folderName}/${item.name}`);
                    }
                  }}
                  folderPath={this.state.folderName}
                />
              ))}
              </View>
              {this.state.showCreateFolderModal &&
                <View style={{position: 'absolute', bottom: 0, right: 0, left: 0, top: 0, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{backgroundColor: '#fff', padding: 30, borderRadius: 10}}>
                    <TouchableOpacity onPress={()=>{this.setState({showCreateFolderModal: !this.state.showCreateFolderModal});}} style={{position: 'absolute', top: 0, right: 0, padding: 10}}>
                      <Text>Cerrar</Text>
                    </TouchableOpacity>
                    <FolderCreator folder={this.state.folderName}/>
                  </View>
                </View>
              }
              {this.state.showCreateModal && 
                <View style={{position: 'absolute', bottom: 60, right: 20, backgroundColor: '#fff', padding: 10}}>
                  <TouchableOpacity onPress={()=>{this.setState({showCreateModal: !this.state.showCreateModal, showCreateFolderModal: !this.state.showCreateFolderModal});}}>
                    <Text>Crear Carpeta</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.setState({showCreateModal: !this.state.showCreateModal});}}>
                    <Text>Crear Nota</Text>
                  </TouchableOpacity>
                  <ImportButton folder={this.state.folderName} />
                </View>
              }
              <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 20}} onPress={() => {this.setState({showCreateModal: !this.state.showCreateModal});}}>
                <FontAwesomeIcon name="plus" size={30} color="#000" />
              </TouchableOpacity>
              
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  superiorBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 100,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'justify',
    height: 100,
    width: '100%',
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
