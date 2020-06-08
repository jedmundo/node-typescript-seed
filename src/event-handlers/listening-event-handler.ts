interface AddressObject {
  port: number;
}

export const ListeningEventHandler = (address: string | AddressObject): (() => void) => {
  return () => {
    let bind;

    if (typeof address === 'string') {
      bind = `pipe ${address}`;
    } else {
      bind = `port ${address.port}`;
    }

    console.info(`Listening on ${bind}`);
  };
};
