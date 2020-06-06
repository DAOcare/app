import React, { Suspense, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { useDispatch, useSelector } from 'react-redux';
import { getFundSize, getInterestPrev } from '../redux/fund/fundActions';
import {
  setDaiDeposit,
  connectUser,
  setHasAProposal,
  setVotes,
} from '../redux/user/userActions';

import { setProvider } from '../redux/web3/web3Actions';

import useInterval from '../utils/useInterval';
import useIteration from '../utils/useIteration';
import useUserData from '../utils/useUserData';
import useDepositContract from '../utils/useDepositContract';
import useWeb3Modal from '../utils/useWeb3Modal';
import useProposalsData from '../utils/useProposals';

import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  pageOuterContainer: {
    position: 'relative',
    height: '80vh',
  },
}));

const PageContainer = (props) => {
  const dispatch = useDispatch();
  const userData = useUserData();
  const depositContract = useDepositContract();
  const proposalsData = useProposalsData();
  const web3Modal = useWeb3Modal();
  const iteration = useIteration();

  const { connected, address, daiBalance } = useSelector((state) => state.user);

  // On App Load
  useEffect(() => {
    proposalsData.fetchProposals();

    userData.getUsers();

    depositContract.getFundSize();

    if (web3Modal.web3Modal.cachedProvider) {
      web3Modal.triggerConnect();
    }

    iteration.getIteration();
    iteration.getCurrentIterationIncreaseTimestamp();
  }, []);

  useEffect(() => {
    depositContract.getFundSize();
  }, [daiBalance]);

  // On connection changes
  useEffect(() => {
    if (address) {
      userData.getUserData(address.toLowerCase());
      if (web3Modal.web3Modal.cachedProvider) {
        web3Modal.triggerConnect();
      }
    }
  }, [connected, address]);

  // TODO: bring back
  // This should execute once web3connect has loaded then iterate in the background
  // useInterval(async () => {
  //   if (web3Connect) {
  //     let interestPrev = await web3Connect.contracts.dao.methods.getInterest();
  //     dispatch(getInterestPrev(interestPrev));
  //     let totalFundSize = await web3Connect.contracts.dao.methods.getTotalDepositedAmount();
  //     dispatch(getFundSize(totalFundSize));
  //   }
  // }, 2000);

  const { route } = props;

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.pageOuterContainer}>
      <Suspense fallback={<LinearProgress />}>
        {renderRoutes(route.routes)}
      </Suspense>
    </Paper>
  );
};

PageContainer.propTypes = {
  route: PropTypes.object,
};

export default PageContainer;
