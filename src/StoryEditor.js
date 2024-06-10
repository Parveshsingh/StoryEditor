import React, { useState,useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StoryEditor = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAgastyaMode, setAgastyaMode] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [responseText, setResponseText] = useState('');
  const inputRef = useRef(null);

  const [selectedValue, setSelectedValue] = useState('');

  const [options, setOptions] = useState([
    { key: 'connect', label: 'Connect Grammar & Spelling' },
    { key: 'improve', label: 'Improve Writing' },
    { key: 'longer', label: 'Make it Longer' },
    { key: 'shorten', label: 'Make it shorter' },
    { key: 'summarise', label: 'Summarize' },
    { key: 'todoList', label: 'Make a To-Do-List' },
  
  ]);

  //this create static while choosing the data in AI
  const [aiAnswers, setAIAnswer] = useState([
    { key: 'connect', label: 'Grammar is highlighted through the use of correct sentence structure, punctuation, and word order' },
    { key: 'improve', label:"Effective writing requires a seamless blend of grammar and spelling. Grammar rules provide the framework and coherence necessary to clearly convey ideas. Meanwhile, accurate spelling ensures words are correctly represented, preventing confusion and maintaining professionalism. Together, grammar and spelling form a foundation that supports reader comprehension and enhances the writer's credibility." },
  
  ]);


  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.optionItem} onPress={() => getSelectedValue(item.key)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setSelectedValue('');
  };

  const getSelectedValue = (value) => {
    const filteredData = aiAnswers.filter(item => item.key === value);
    const label = filteredData.map(item => item.label);
    setSelectedValue(label);
  };


  const handleTextInputFocus = () => {
    setPopupVisible(true);
    setSelectedValue('');
    setAgastyaMode(false);
  };
  const cancel = () => {
    setSelectedValue('');
  };

  const handleStarIconPress = () => {
    setAgastyaMode(true);
    Keyboard.dismiss();
  };

  const handleKeyboardIconPress = () => {
    setAgastyaMode(false);
    inputRef.current.focus();
    setSelectedValue('');
  };

  const handleAgastyaRequest = async (action) => {
    // Simulate a server request
    const requestBody = selectedText || body;
    try {
      setResponseText('Testing');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        ref={inputRef}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        onFocus={handleTextInputFocus}
      />
      <TextInput
        style={styles.subtitleInput}
        placeholder="Sub Title"
        value={subtitle}
        onChangeText={setSubtitle}
        onFocus={handleTextInputFocus}
      />
      <TextInput
        style={styles.bodyInput}
        placeholder="Write your story..."
        value={body}
        onChangeText={setBody}
        onFocus={handleTextInputFocus}
        multiline
      />

      {isPopupVisible && (
        <View style={styles.popupBar}>
          <TouchableOpacity onPress={handleKeyboardIconPress}>
          <Icon name="keypad-outline" size={20}></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStarIconPress}>
          <Icon name="star-outline" size={20}></Icon>
          </TouchableOpacity>
        </View>
      )}

      {isAgastyaMode && (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.agastyaContainer}>
          <View style={styles.rowcontainer}>
      <Text style={styles.rowtext}>{"Ask Agastya AI"}</Text>
      <View style={styles.iconContainer}>
      <Icon name="arrow-forward-outline" size={20}></Icon>
      </View>
    </View>
            <TextInput
              style={styles.agastyaInput}
              placeholder="Ask me or choose an option"
              placeholderTextColor="gray"
              value={selectedText}
              onChangeText={setSelectedText}
            />
  {selectedValue !== '' && (
        <View style={styles.responseText}>
          <Text>{selectedValue}</Text>
          <View style={styles.rowcontainer}>
          <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={cancel}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.continueButton]}
        
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
    </View>
        </View>
      )}
       {selectedValue === '' && (
         <FlatList
         style={styles.optionsContainer}
         data={options}
         renderItem={renderOption}
         keyExtractor={(item) => item.key.toString()}
         scrollEnabled={true} 
       />
      )}
           
          </View>
        </TouchableWithoutFeedback>
      )}

  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    padding:10
  },
  subtitleInput: {
    fontSize: 18,
    padding:10,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    justifyContent: 'center',
  
    alignItems: 'center',
    minWidth: 100,
  },
  bodyInput: {
    fontSize: 16,
    padding:10,
    flex: 1,
    textAlignVertical: 'top',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  popupBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#ddd',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  agastyaContainer: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  agastyaInput: {
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  agastyaOptions: {
    marginBottom: 10,
  },
  responseText: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  optionsContainer: {
    maxHeight: 150, 
    marginTop: 5,
    marginBottom: 5,
  },
  optionItem: {
    padding: 10,
  
  },
  rowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    padding: 5,
    backgroundColor: 'white',
  },
  rowtext:{
    color:'black',
    fontSize:20
  },
  cancelButton: {
    backgroundColor: 'white', 
    borderWidth: 1,
    borderColor: 'grey',
  },
  continueButton: {
    backgroundColor: 'white', 
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default StoryEditor;
