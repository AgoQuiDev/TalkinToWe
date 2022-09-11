import {getData, setData} from './asyncstorage';
const USERID_KEY = '@user_id';
const NICKNAME_KEY = '@user_nickname';

export const getUserInfos = async () => {
  const id = (await getData(USERID_KEY)) || '';
  const name = (await getData(NICKNAME_KEY)) || '';
  return {id, name};
};

export const setUserInfos = async (id: string, name: string) => {
  await setData(id, USERID_KEY);
  await setData(name, NICKNAME_KEY);
};
