import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const App = () => {
  const [numerosSelecionados, setNumerosSelecionados] = useState([]);
  const [concurso, setConcurso] = useState(0);
  const [historico, setHistorico] = useState([]);

  const geradorNumerosAleatorios = () => {
    return Math.floor(Math.random() * 60) + 1;
  };

  const formatNumeros = (numero) => {
    return numero < 10 ? `0${numero}` : `${numero}`;
  };

  const handleNumerosSorteados = () => {
    const novoNumero = [];
    while (novoNumero.length < 6) {
      const numeroAleatorio = geradorNumerosAleatorios();
      if (!novoNumero.includes(numeroAleatorio)) {
        novoNumero.push(numeroAleatorio);
      }
    }
    setNumerosSelecionados(novoNumero);
    const novoConcurso = concurso + 1;
    setConcurso(novoConcurso);
    setHistorico([{ concurso: novoConcurso, numeros: novoNumero }, ...historico]);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/megasena.png')} style={styles.background} />
      <View style={styles.content}> 
        <View style={styles.sorteioNumeros}>
          <Image source={require('./assets/logo_megasena.png')} style={styles.logo}/>
          <View style={styles.infoContainer}>
            <Text style={styles.concurso}>Concurso: {concurso}</Text>
            <View style={styles.numeros}>
              {numerosSelecionados.map((number, index) => (
                <Text key={index} style={styles.numero}>
                  {formatNumeros(number)}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNumerosSorteados}>
          <Text style={styles.buttonText}>Sortear Números</Text>
        </TouchableOpacity>
        <View style={styles.historicoContainer}>
          <FlatList
            data={historico}
            keyExtractor={(item) => item.concurso.toString()}
            renderItem={({ item }) => (
              <View style={styles.historicoItem}>
                <Text style={styles.historicoConcurso}>Concurso {item.concurso}</Text>
                <Text style={styles.historicoNumeros}>
                  {item.numeros.map(formatNumeros).join(', ')}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#009F44',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 600,
    height: 60,
    marginBottom: 10,
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sorteioNumeros: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#009F44',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  concurso: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  numeros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numero: {
    fontSize: 16,
    color: '#009F44',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historicoContainer: {
    height: 200,
    width: '100%',
    marginTop: 20,
  },
  historicoItem: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  historicoConcurso: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historicoNumeros: {
    fontSize: 16,
  },
});

export default App;
