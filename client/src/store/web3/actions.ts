import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Web3Actions} from './index';
import Web3 from 'web3';
import {REQUIRED_NETWORK} from '../../config';

declare global {
  interface Window {
    web3: Web3;
    ethereum: any;
  }
}

export const connectWeb3 = (): ThunkAction<void, RootState, unknown, Web3Actions> => async (
  dispatch
) => {
  console.log('CW3');
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    if (networkId !== REQUIRED_NETWORK) {
      dispatch({type: 'WEB3_FAILED', payload: {error: 'WRONG_NETWORK_ERROR'}});
      return;
    }


    dispatch({
      type: 'WEB3_CONNECTED',
      payload: {
        web3,
        accounts,
        networkId,
      },
    });
  } else {
    dispatch({type: 'WEB3_FAILED', payload: {error: 'CONNECTION_ERROR'}});
  }
};
