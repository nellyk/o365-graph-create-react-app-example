import React, { useState, useEffect } from 'react';
import './App.css';
import { Agenda, Login } from '@microsoft/mgt-react';
import { Providers, ProviderState } from '@microsoft/mgt-element';

const MyEvent = (props) => {
  const { event } = props.dataContext;
  return <div>{event.subject}</div>;
};
function useIsSignedIn(){
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    }
  }, []);

  return [isSignedIn];
}
function App() {

  const [isSignedIn] = useIsSignedIn();
  return (
    <div className="App">
      <header>
      <Login />
      </header>
      <div>
  {isSignedIn &&
    <Agenda group-by-day days="7" show-max="2" event-query="/me/events?orderby=start/dateTime">
    
    <MyEvent template="event-other" />
  </Agenda>
  }
</div>
    </div>

  );
}

export default App;
