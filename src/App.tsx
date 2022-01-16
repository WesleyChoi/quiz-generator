import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  CallComposite,
  CallAdapter,
  createAzureCommunicationCallAdapter,
  ChatComposite,
  ChatAdapter,
  createAzureCommunicationChatAdapter
} from '@azure/communication-react';
import React, { useEffect, useMemo, useState } from 'react';
import { ACSidentity, ACSUserAccessToken } from './public-keys/azure-api';

function App(): JSX.Element {
  const endpointUrl = 'https://nwhack.communication.azure.com/';
  const userId = ACSidentity;
  const displayName = 'The Professor';
  const token = ACSUserAccessToken;

  //Calling Variables
  //For Group Id, developers can pass any GUID they can generate
  const groupId = ACSUserAccessToken;
  const [callAdapter, setCallAdapter] = useState<CallAdapter>();

  //Chat Variables
  const threadId = ACSUserAccessToken;
  const [chatAdapter, setChatAdapter] = useState<ChatAdapter>();

  // We can't even initialize the Chat and Call adapters without a well-formed token.
  const credential = useMemo(() => {
    try {
      return new AzureCommunicationTokenCredential(token);
    } catch {
      console.error('Failed to construct token credential');
      return undefined;
    }
  }, [token]);

  useEffect(() => {
    const createAdapter = async (): Promise<void> => {
      setChatAdapter(
        await createAzureCommunicationChatAdapter({
          endpoint: endpointUrl,
          userId: { communicationUserId: userId },
          displayName,
          credential: new AzureCommunicationTokenCredential(token),
          threadId
        })
      );
      setCallAdapter(
        await createAzureCommunicationCallAdapter({
          userId: {communicationUserId: userId },
          displayName,
          credential: new AzureCommunicationTokenCredential(token),
          locator: { groupId }
        })
      );
    };
    createAdapter();
  }, []);

  if (!!callAdapter && !!chatAdapter) {
    return (
      <>
        <ChatComposite adapter={chatAdapter} />
        <CallComposite adapter={callAdapter} />
      </>
    );
  }
  if (credential === undefined) {
    return <h3>Failed to construct credential. Provided token is malformed.</h3>;
  }
  return <h3>Initializing...</h3>;
}

export default App;
