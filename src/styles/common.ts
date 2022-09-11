import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  sameLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#C87FD1',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  constainerView: {
    margin: 10,
  },
});
