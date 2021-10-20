import amplitude from 'amplitude-js';

export const texts = {
  eventPrefix: 'eSyfo DMA:',
};

const combineEventData = (eventData?: Record<string, string>) => {
  return {
    team: 'eSyfo',
    app: 'dialogmotearbeidsgiver',
    ...eventData,
  };
};

export const initAmplitude = () => {
  amplitude?.getInstance().init('default', '', {
    apiEndpoint: 'amplitude.nav.no/collect-auto',
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

export const trackEvent = (eventName: string, eventData?: Record<string, string>) => {
  amplitude?.getInstance().logEvent(eventName, combineEventData(eventData));
};

export const trackOnClick = (elementName: string, eventData?: Record<string, string>) => {
  const trackingName = `${texts.eventPrefix} ${elementName}`;
  amplitude?.getInstance().logEvent(trackingName, combineEventData(eventData));
};
