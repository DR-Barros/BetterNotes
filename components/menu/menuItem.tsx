import React, {Component} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import MenuItemStyle from '../../style/components/menu/menuItemStyle';

interface MenuItemInterface {
    folderName: string;
    folderPath: string;
    notesCount: number;
    isDirectory: boolean;
    onPress: () => void;
}
interface MenuItemState {
    folderName: string;
    folderPath: string;
    notesCount: number;
    isDirectory: boolean;
}

class MenuItem extends Component<MenuItemInterface, MenuItemState> {
  constructor(props: MenuItemInterface) {
    super(props);
    this.state = {
      folderName: this.props.folderName,
      folderPath: this.props.folderPath,
      notesCount: this.props.notesCount,
      isDirectory: this.props.isDirectory,
    };
    // si es un archivo le quitamos la extensión al nombre
    if (!this.state.isDirectory){
      this.state.folderName = this.state.folderName.split('.')[0];
    }
  }
  getFolderContent = async () => {
    try {
      // Ruta de la carpeta cuyo contenido quieres obtener
      const folderPath = `${FileSystem.documentDirectory}${this.state.folderPath}/${this.state.folderName}`;

      // Obtener información sobre el contenido de la carpeta
      if (this.state.isDirectory) {
        const folderContent = await FileSystem.readDirectoryAsync(folderPath);
      
        this.setState({ notesCount: folderContent.length });
      }
    } catch (error) {
      console.error('Error al obtener el contenido de la carpeta:', error);
    }
  };
  componentDidMount(): void {
    this.getFolderContent();
  }

  componentDidUpdate(prevProps: Readonly<MenuItemInterface>, prevState: Readonly<MenuItemState>, snapshot?: any): void {
    if (prevProps.folderName !== this.props.folderName || prevProps.folderPath !== this.props.folderPath) {
      this.setState({ 
        folderName: this.props.folderName,
        folderPath: this.props.folderPath,
        isDirectory: this.props.isDirectory,
      });
    }
    this.getFolderContent();
  }

  render() {
    const { onPress } = this.props;

    return (
        <TouchableOpacity
          onPress={onPress}
          style={styles.container}
        >
            <View>
                <Text style={styles.folderName}>{this.state.folderName}</Text>
                {this.state.isDirectory &&
                <Text style={styles.notesCount}>{this.state.notesCount} elementos</Text>
                }
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = MenuItemStyle;

export default MenuItem;