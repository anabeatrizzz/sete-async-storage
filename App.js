import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';

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

const estilos = StyleSheet.create({
	conteudo: {
		flex: 1,
		backgroundColor: "#ffffb3",
		padding: 10,
	},
	
	viewHandleItens: {
		borderWidth: 2,
		borderRadius: 5,
		marginBottom: 20,
		padding: 3,
		flexDirection: 'row',
		borderColor: '#e6e600',
		backgroundColor: '#ffff99'
	},

	textoTituloUm: {
		marginTop: 150,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#ff6600',
		textShadowColor: '#ffb380',
		textShadowRadius: 5,
		textShadowOffset: {
			width: 3,
			height: 3
		}
	},
	
	textoTituloDois: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
		color: '#ff6600',
		textShadowColor: '#ffb380',
		textShadowRadius: 5,
		textShadowOffset: {
			width: 3,
			height: 3
		}
	},

	imageStyle: {
		width: 100,
		height: 100,
		marginRight: 10
	},

	viewDescricao: {
		width: 240
	},

	titulo: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#ffbf00',
		textShadowColor: '#ffcc00',
		textShadowRadius: 10,
		textShadowOffset: {
			width: 2,
			height: 2
		}
	},

	botao: {
		alignItems: "center",
		backgroundColor: "#ff6600",
		padding: 10,
		borderRadius: 5,
	},

	textoBotao: {
		color: '#fff0e6',
		fontWeight: 'bold'
	},

	textoSubtotal: {
		color: '#ff6600',
		textShadowColor: '#ffb380',
		textShadowRadius: 5,
		textShadowOffset: {
			width: 3,
			height: 3
		}
	},

	textoValor: {
		color: '#ffbf00',
		textShadowColor: '#ffcc00',
		textShadowRadius: 5,
		textShadowOffset: {
			width: 3,
			height: 3
		}
	}
})

export default App;