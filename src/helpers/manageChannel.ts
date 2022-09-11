import type {SendbirdGroupChannel, SendbirdUser} from '@sendbird/uikit-utils';
import {SENDBIRD_URL_PUBLIC_CHANNEL} from '../env';

const createPublicChannel = async (
  sdk: any,
  currentUser: SendbirdUser | undefined,
): Promise<SendbirdGroupChannel | undefined> => {
  if (!currentUser) {
    return;
  }
  const params = new sdk.GroupChannelParams();
  params.isPublic = true;
  params.addUserIds([currentUser.userId]);
  params.name = 'Small talk';
  params.channelUrl = SENDBIRD_URL_PUBLIC_CHANNEL;

  return await sdk.GroupChannel.createChannel(
    params,
    (groupChannel: SendbirdGroupChannel, error: string) => {
      if (error) {
        console.warn('Error on create channel', error);
        return;
      }
      return groupChannel;
    },
  );
};

export const getPublicChannel = async (
  sdk: any,
  currentUser: SendbirdUser | undefined,
): Promise<SendbirdGroupChannel | undefined> => {
  let publicChannel;
  try {
    publicChannel = await sdk.GroupChannel.getChannel(
      SENDBIRD_URL_PUBLIC_CHANNEL,
    );
  } catch (e) {
    publicChannel = await createPublicChannel(sdk, currentUser);
  } finally {
    return publicChannel;
  }
};

export const joinUserToChannel = async (channel, currentUserId) => {
  const userIsMember = channel.members.find(
    ({userId}) => userId === currentUserId,
  );
  if (!userIsMember) {
    channel.join(() => console.warn('User is now member'));
  }
};

export const getChannelsList = async (sdk) => {
  const query = new sdk.GroupChannelListQuery();
  query.includeEmpty = true;
  if (query.hasNext) {
    const channelsList = await query.next();
    return channelsList;
  }
  return [];
};

export const getChannelName = (channel: SendbirdGroupChannel) => {
  return channel.name || channel.members.map(m => m.nickname).join();
};


export const createPrivateChannel = async (
  sdk: any,
  usersIds: Array<string>,
  channelName: string,
): Promise<SendbirdGroupChannel | undefined> => {
  if (usersIds.length === 0) {
    return;
  }
  const params = new sdk.GroupChannelParams();
  params.isPublic = false;
  params.addUserIds(usersIds);
  params.name = channelName;
  params.isDistinct = true;

  return await sdk.GroupChannel.createChannel(
    params,
    (groupChannel: SendbirdGroupChannel, error: string) => {
      if (error) {
        console.warn('Error on create channel', error);
        return;
      }
      return groupChannel;
    },
  );
};

export const getChannel = async (sdk, urlChannel) => {
  const channel = await sdk.GroupChannel.getChannel(urlChannel);
  return channel;
}
