import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Container,
  TitleInput,
  BodyInput,
  SaveButton,
  SaveButtonImg,
  CloseButton,
  CloseButtonImg,
  DeleteButton,
  DeleteButtonText,
} from './styled';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
export default () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const list = useSelector((state) => state.notes.list);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('new');

  const handleSaveButton = () => {
    if (title && body) {
      if (status == 'edit') {
        dispatch({
          type: 'EDIT_NOTE',
          payload: {
            key: route.params.key,
            title,
            body,
          },
        });
      } else {
        dispatch({
          type: 'ADD_NOTE',
          payload: {
            title,
            body,
          },
        });
      }
      navigation.goBack();
    } else {
      alert('preencha titulo e corpo');
    }
  };

  const handleCloseButton = () => {
    navigation.goBack();
  };

  const handleDeleteButton = ()=>{
    dispatch({
      type:'DEL_NOTE',
      payload:{
        key:route.params.key,
      },
    });
    navigation.goBack();
  }

  useEffect(() => {
    if (route.params?.key !== undefined && list[route.params.key]) {
      setStatus('edit');
      setTitle(list[route.params.key].title);
      setBody(list[route.params.key].body);
    }
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: status === 'new' ? 'Nova anotação' : 'Editar anotação',
      headerLeft: () => {
        <CloseButton underlayColor="transparent" onPress={handleCloseButton}>
          <CloseButtonImg source={require('../../assets/close.png')} />
        </CloseButton>;
      },
      headerRight: () => (
        <SaveButton underlayColor="transparent" onPress={handleSaveButton}>
          <SaveButtonImg source={require('../../assets/save.png')} />
        </SaveButton>
      ),
    });
  }, [status, title, body]);
  return (
    <Container>
      <TitleInput
        placeholder="Digite o titulo da anotação"
        placeholderTextColor="#CCC"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <BodyInput
        placeholder="Digite o corpo da anotação"
        placeholderTextColor="#CCC"
        multiline={true}
        textAlignVertical="top"
        onChangeText={(text) => setBody(text)}
        value={body}
      />
      {status == 'edit' &&
        <DeleteButton underlayColor="#FF0000" onPress={handleDeleteButton}>
          <DeleteButtonText>Excluir anotação</DeleteButtonText>
        </DeleteButton>
      }
    </Container>
  );
}