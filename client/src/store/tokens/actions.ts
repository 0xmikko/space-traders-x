import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {TokenActions} from './index';



export const getAllowance = (): ThunkAction<void, RootState, unknown, TokenActions> => async (
    dispatch,
    getState
) => {
  // const web3 = await getState().web3.web3;
};

//
//
// export async function getTokenContract(web3: Web3, address: string): Promise<Erc20> {
//   return ((await getContract(web3, erc20Json, address)) as unknown) as Erc20;
// }
//
// export const getTokenDetails = (
//   id: string
// ): ThunkAction<void, RootState, unknown, TokenActions> => async (dispatch, getState) => {
//
//   if (id === undefined || id =="") return;
//   const {web3, accounts,poolServiceAddress} = getState().web3;
//   const currentAccount = accounts[0];
//   if (web3 === null ||  poolServiceAddress === undefined) throw new Error('No Web3 instance');
//   if (currentAccount === undefined) throw new Error("No current account were selected")
//   console.log("AADREE", poolServiceAddress, currentAccount, id);
//   const tContract = await getTokenContract(web3, id);
//   const name = await tContract.methods.name().call();
//   const symbol = await tContract.methods.symbol().call();
//   const decimals = parseInt(await tContract.methods.decimals().call());
//   const allowance = await tContract.methods.allowance(currentAccount, poolServiceAddress).call();
//   const balance = await tContract.methods.balanceOf(currentAccount).call();
//   const totalSupply = await tContract.methods.totalSupply().call();
//
//
//   const tokenData: Token = {
//     name,
//     symbol,
//     address: id,
//     allowance: tokenDecimals(allowance, decimals),
//     balance: tokenDecimals(balance, decimals),
//     totalSupply: tokenDecimals(totalSupply, decimals),
//   };
//   console.log(tokenData);
//   dispatch({
//     type: 'TOKEN_DETAILS',
//     payload: tokenData,
//   })
// };
//
//
//
export const approve = (id: string, sum: number): ThunkAction<void, RootState, unknown, TokenActions> => async (
  dispatch,
  getState
) => {
  // if (id === undefined || id =="") return;
  // const {web3, accounts, poolServiceAddress} = getState().web3;
  // const currentAccount = accounts[0];
  // if (web3 === null ||  poolServiceAddress === undefined) throw new Error('No Web3 instance');
  // if (currentAccount === undefined) throw new Error("No current account were selected")
  // const tContract = await getTokenContract(web3, id);
  // const decimals = parseInt(await tContract.methods.decimals().call());
  // const bigNumberSum = (new BigNumber(sum).multipliedBy(`1e${decimals}`))
  // await tContract.methods.approve(poolServiceAddress, bigNumberSum.toFixed(0)).send({from: currentAccount});
  // dispatch(getTokenDetails(id));
};
