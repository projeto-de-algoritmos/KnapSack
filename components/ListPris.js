import React from 'react';
import ListView from 'deprecated-react-native-listview';
import {
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
  Button,
} from 'react-native';
import ListItems from './ListItems.js';
/*
sac : {
  poidsMax : valeur,
  poidsObtenu:0,
  valeurObtenue : 0,
  items : [
    0 : {
      poids : valeur,
      valeur : valeur,
      nom : nom,
      pris : false
    } ,
       ....
  ]
}
*/
export default class ListPris extends React.Component {
  static colorState = true;

  static navigationOptions = {
    headerStyle: {backgroundColor: '#364958'},
    headerTintColor: '#FFF',
  };
  constructor(props) {
    super(props);

    const {params} = this.props.navigation.state;
    const sac = params ? params.sac : null;
    console.log(sac);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      sac: sac,
      dataSource: null,
    };
    /*this.state={
      sac:this.props.navigator.params.sac,
      dataSource:null
    }
    */
    this.state.sac.items.sort(function(a, b) {
      return b.pris - a.pris;
    });
    this.state.dataSource = ds.cloneWithRows(this.state.sac.items);
  }
  listItemRender(rowData) {
    this.colorState = !this.colorState;
    styleContainer = {};
    if (this.colorState) styleContainer = styles.containerBlue;
    else styleContainer = styles.containerRed;
    composant = null;
    if (rowData.pris) {
      composant = <Image source={require('../assets/bpwhite.png')} />;
    } else {
      composant = <Text style={styles.valeur}>{'____'}</Text>;
    }
    return (
      <View style={styleContainer}>
        <View style={styles.itemInfo}>{composant}</View>
        <View style={styles.itemInfo}>
          <Text style={styles.nom}>{rowData.name}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.valeur}>{rowData.weight + ' kg'}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.valeur}>{rowData.value + ' دج '}</Text>
        </View>
      </View>
    );
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista dos Items</Text>

        <View style={styles.bpwrap}>
          <Image source={require('../assets/backpack.png')} />
          <View style={styles.bpinfowrap}>
            <Text style={styles.bginfo}>
              Peso : {this.state.sac.poidsObtenu}{' '}
            </Text>
            <Text style={styles.bginfo}>
              Ocupou:{' '}
              {(this.state.sac.poidsObtenu / this.state.sac.poidsMax) * 100 +
                '%'}{' '}
            </Text>
            <Text style={styles.bginfo}>
              Valor: {this.state.sac.valeurObtenue}{' '}
            </Text>
          </View>
        </View>
        <ScrollView>
          <ListView
            style={styles.listview}
            dataSource={this.state.dataSource}
            renderRow={rowData => this.listItemRender(rowData)}
          />
        </ScrollView>
        <Button
          title="Finalizar"
          onPress={() => navigate('Home')}
          style={styles.button}
          width="150%"
          color="#2D3C49"
        />
      </View>
    );
  }
}

///const rouge="#F58287";
const rouge = '#fff'; //"#919BA3";
const bleuFonc = '#fff'; //"#364958"
const styles = StyleSheet.create({
  bpwrap: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  bpinfowrap: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  bginfo: {
    fontSize: 20,
    marginVertical: 5,
    fontFamily: 'Cochin',
  },
  listview: {},
  itemInfo: {
    width: 50,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 3,
    ///backgroundColor:"#BDD5EA"
  },
  containerRed: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 1,
    backgroundColor: rouge,
  },
  containerBlue: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 1,
    backgroundColor: bleuFonc,
  },
  nom: {
    fontSize: 25,
    color: '#000',
  },
  valeur: {
    color: '#000',
  },

  title: {
    fontSize: 30,
    fontFamily: 'Cochin',
    color: '#364958',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 25,
  },
  button: {
    marginTop: 50,
  },
  input: {
    height: 40,
    width: '60%',
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
  },
});
