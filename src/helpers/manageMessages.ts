const formatMessagesToSectionMessages = messages => {
  let previousLocalDate = '';
  return messages.reduce((returnMessages, mess) => {
    const localDate = new Date(mess.createdAt).toLocaleDateString();
    const {nickname} = mess.sender;
    if (previousLocalDate !== localDate) {
      previousLocalDate = localDate;
      return [
        ...returnMessages,
        {title: localDate, data: [{...mess, nickname}]},
      ];
    }
    returnMessages[returnMessages.length - 1].data.push({...mess, nickname});
    return [...returnMessages];
  }, []);
};

const retrieveMessages = async (messParams, currentChannel) => {
  const messages = await currentChannel.getMessagesByTimestamp(
    Date.now(),
    messParams,
  );
  return formatMessagesToSectionMessages(messages);
};

export const loadMoreMessages = async (sdk, currentChannel, totalMessages) => {
  if (!currentChannel) {
    return;
  }
  const messParams = new sdk.MessageListParams();
  messParams.prevResultSize = totalMessages;
  messParams.nextResultSize = 0;
  messParams.includeThreadInfo = true;
  messParams.reverse = true;
  return retrieveMessages(messParams, currentChannel);
};

export const sendMessage = async (
  sdk,
  currentChannel,
  message,
  loadMessages,
) => {
  if (currentChannel) {
    try {
      const params = new sdk.UserMessageParams();
      params.message = message;
      currentChannel.sendUserMessage(params, loadMessages);
    } catch (error) {
      console.log('sended=>error', error);
    }
  }
};

const extractMatch = (url: string) => {
  return url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
};

const extractId = (url: string) => {
  const listMatch = extractMatch(url);
  return listMatch && listMatch[2].length === 11 ? listMatch[2] : undefined;
};

export const isYoutubeVideo = (url: string) => {
  return !!extractId(url);
};

export const getUrlPoster = (url: string) => {
  const id = extractId(url);
  return `http://img.youtube.com/vi/${id}/hqdefault.jpg`;
};
