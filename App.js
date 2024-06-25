import React, { Component } from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  Text,
  TouchableOpacity
 } from 'react-native';

 class App extends Component {

  // CONSTRUTOR ONDE ARMAZENA OS ESTADOS DO APP
  constructor(props){ 
    super(props);
    this.state = {
      numero: 0,
      botao: 'INICIAR',
      ultimo: null
    };

    // VARIAVEL DO TIMER DO RELOGIO
    this.timer = null 

    this.iniciar = this.iniciar.bind(this)
    this.parar = this.parar.bind(this)
  }


    // funções dos botões
    iniciar(){

        // VERIFICAÇÃO QUE PAUSA O RELOGIO
        if(this.timer != null) {

          // AQUI VAI PARAR O TIMER VOLTANDO O RESULTADO PARA NULL
          clearInterval(this.timer);
          this.timer = null

          this.setState({botao: 'CONTINUAR'});

        } else {

          // função que irá disparar o cronômetro
          // acontece uma soma entre o numero atual '0.0' + '0.1' até o usuário clicar em parar
          this.timer = setInterval(() => {
            this.setState({numero: this.state.numero + 0.1})
          
          // intervalo que irá determinar a contagem dos milisegundos
        }, 100);

        // MUDA O ESTADO DO BOTAO QUANDO ESTIVER DISPARADO
        this.setState({botao: 'PAUSAR'});
      }      
    }

    // PARAR O CRONÔMETRO
    parar(){
      // verifica se o timer está funcionando
      if (this.timer != null) {
        // caso estiver funcionando, para o timer voltando para nulo
        clearInterval(this.timer);
      }

      // zera o cronometro e muda o botão para iniciar novamente
      this.setState({
        // armazena o tempo do cronometro 
        ultimo: this.state.numero,
        numero: 0,
        botao: 'INICIAR',
      })
    }
  

    render(){
        return(
          <View style={styles.container}>

        {/* IMAGEM CRONOMETRO */}
        <Image
          source={require('./src/cronometro.png')}
          style={styles.cronometro}
        />

        {/* PARA QUE ESSE TEXTO SE TRANSFORME EM UM RELÓGIO DEVE SER TRANSFORMADO EM UM STATE */}

        {/* TO FIXED DEFINE O NUMERO DE CASAS APOS A VIRGULA */}
        <Text style={styles.timer}> {this.state.numero.toFixed(1)} </Text>

        {/* VIEW PARA MANTER OS BOTÕES LADO A LADO */}
        <View style={styles.btnArea}>

          <TouchableOpacity style={styles.btn}
            // ação do botão
            onPress={this.iniciar}
          >
            <Text style={styles.btnText}> {this.state.botao} </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}
            // ação do botão
            onPress={this.parar}
          >
            <Text style={styles.btnText}>PARAR</Text>
          </TouchableOpacity>         

        </View>

        <View style={styles.areaUltima}>
            <Text style={styles.textoCorrida}>
              {/* APENAS PODE INSERIR A FUNÇÃO 'TO FIXED' EM RESULTADOS NÃO NULOS
              POR ISSO DEVE SER FEITA UMA VERIFICAÇÃO
              CASO O VALOR SEJA MAIOR QUE 0 ENTÃO ELE INSERE A FUNÇÃO
              SE NAO MOSTRA APENAS A STRING VAZIA*/}
              {this.state.ultimo > 0 ? 'Último tempo : ' + this.state.ultimo.toFixed(2) + 's' : ''}
            </Text>
        </View>
        
      </View>
      );
  }
}       


const styles = StyleSheet.create({
  // ESTILO CONTAINER
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#0a6600'
  },

  // ESTILO TEXTO CONTAGEM RELOGIO
  timer:{
    marginTop: -160,
    color:'#fff',
    fontSize: 65,
    fontWeight: 'bold',
  },

  // ESTILO AREA BOTOES
  btnArea:{
    // mantem os dois botoes em linha
    flexDirection: 'row',
    marginTop: 70,
    height: 40,
  },

  // ESTILO BOTOES 
  btn:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  
  // ESTILO TEXTO BOTOES
  btnText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a6600',
  },

  // ESTILO ULTIMO TEMPO MARCADO
  areaUltima:{
    marginTop: 40,
  },

  textoCorrida: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#fff'
  }

});

export default App;
