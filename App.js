import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';
import estilos from './componentes/Estilo.js';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      checadoUm: false, mostre: 'none', nm: "", p: 0
    }

    this.lista = [
      {
        imagem: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/shortcake_1f370.png',
        titulo: 'Bolo de banana',
        descricao: 'Não seja sacana, experimente agora (por R$16 e 59 centavos) o bolo da Ana Banana.',
        preco: 16.59
      }
    ];
  }

  componente = () => {
    AsyncStorage.getItem('titulo').then(
      (valor) => this.setState({
        'nm': valor
      })
    )

    AsyncStorage.getItem('preco').then(
      (valor) => this.setState({
        'p': valor
      })
    )
  }

  handleFinalizar = () => {
    if(this.state.checadoUm){
      AsyncStorage.setItem('titulo', this.lista[0].titulo);
      AsyncStorage.setItem('preco', this.lista[0].preco);
      this.setState({
        nm: this.lista[0].titulo,
        p: this.lista[0].preco
      })

      this.setState({
        mostre: 'flex'
      })
    } else {
      this.setState({
        mostre: 'none'
      })
    }
  }

  render(){
    return(
      <>
        <StatusBar barStyle="light-content" />
        <View style={estilos.conteudo}>
          <Text style={estilos.textoTituloUm}>LANCHONETE</Text>
          <Text style={estilos.textoTituloDois}>ANA BANANA</Text>
          
          <View style={estilos.viewHandleItens}>
            <Image style={estilos.imageStyle} source={{uri: this.lista[0].imagem}} />
            <View>
              <Text style={estilos.titulo}>{this.lista[0].titulo}</Text>
              <View style={estilos.viewDescricao}>
                <Text>{this.lista[0].descricao}</Text>
              </View>
            </View>
            <View>
              <CheckBox
                uncheckedColor="#cccc00"
                size={40}
                checked={this.state.checadoUm}
                checkedColor="#ff6600"
                onPress={
                  () => this.setState({ checadoUm: !this.state.checadoUm })
                }
              />
              <Text>R${this.lista[0].preco}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={this.handleFinalizar} style={estilos.botao}>
            <Text style={estilos.textoBotao}>Finalizar</Text>
          </TouchableOpacity>
          <Text>{'\n'}</Text>
          <Text
          style={
            {
              display: this.state.mostre,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold'
            }
          }
          >
          <Text style={estilos.textoSubtotal}>Nome da comida:</Text> <Text style={estilos.textoValor}>{this.state.nm}</Text>
          <Text>{'\n'}</Text>
          <Text style={estilos.textoSubtotal}>Preço:</Text> <Text style={estilos.textoValor}>{this.state.p}</Text>
          </Text>
        </View>
        
      </>
    )
  }
}

export default App;