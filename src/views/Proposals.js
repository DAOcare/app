import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
// import { fetchProposals } from '../redux/actions';

import PropTypes from 'prop-types';
import Box from '3box';

import useDaoContract from '../utils/useDaoContract';
import useIteration from '../utils/useIteration';

import useRouter from '../utils/useRouter';

import DepositIcon from '@material-ui/icons/AllInclusive';
import TwitterIcon from '@material-ui/icons/Twitter';

import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Grid } from '@material-ui/core';

import Page from '../components/Page';
import Header from '../components/Header';
import ProposalCard from '../components/ProposalCard';
import EllipsisLoader from '../components/EllipsisLoader';

import { FIREBASE_FUNCTIONS_ENDPOINT } from '../config/firebase';
import { twitterHandleAlreadyLinked } from '../modules/twitterDb';

const linkTwitterHandleToEthAddressInFirebase = async (
  handle,
  address,
  txHash
) => {
  const response = await fetch(
    FIREBASE_FUNCTIONS_ENDPOINT + '/registerTwitterHandle',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        handle,
        address,
        txHash,
      }), // body data type must match "Content-Type" header
    }
  );
  return await response.json();
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  flexGrow: {
    flexGrow: 1,
  },
  button: {
    width: 190,
  },
  card: {
    width: 210,
    height: 350,
  },
  decriptionBlurb: { margin: '16px 0' },
}));

const Proposals = () => {
  const daoContract = useDaoContract();
  const iterationData = useIteration();

  const classes = useStyles();
  const router = useRouter();
  const [status, setStatus] = useState('DRAFT');

  useEffect(() => {
    iterationData.getLastWinnerId();
  }, []);

  const { currentIteration, lastWinner } = useSelector(
    (state) => state.iteration
  );
  const { proposals, fetched } = useSelector((state) => state.proposals);

  const {
    connected,
    enabledTwitter,
    address,
    hasAProposal,
    daiDeposit,
    votes,
    lastIterationJoinedOrLeft,
  } = useSelector((state) => state.user);

  const canVoteWithDelegate =
    status === 'ENABLED' || (status !== '3BOX_VERIFIED' && enabledTwitter);

  const [canVoteViaTwitter, setCanVoteViaTwitter] = useState(false);

  const enableTwitter = async () => {
    setStatus('3BOX_VERIFICATION');
    const profile = await Box.getProfile(address);
    const verified = await Box.getVerifiedAccounts(profile);
    if (verified && verified.twitter && verified.twitter.username) {
      setStatus('3BOX_VERIFIED');
      let tx = await daoContract.enableTwitterVoting();
      if (!tx) {
        setStatus('TX_FAILED');
      } else {
        let txHash = tx.transactionHash;
        try {
          let result = await linkTwitterHandleToEthAddressInFirebase(
            verified.twitter.username,
            address,
            txHash
          );
          setStatus('ENABLED');
        } catch (error) {
          console.error(error);
          setStatus('TX_FAILED');
        }
      }
    } else {
      setStatus('3BOX_FAILED');
    }
  };

  // If the user has delegated the voting && the firebase database doesn't have the correct value for their address/twitter handle. This code will fix it.
  useEffect(() => {
    if (canVoteWithDelegate) {
      Box.getProfile(address).then(async (profile) => {
        const verified = await Box.getVerifiedAccounts(profile);
        const twitterIsVerified =
          verified && verified.twitter && verified.twitter.username;

        if (twitterIsVerified) {
          const twitterUsername = verified.twitter.username;
          const isTwitterHandleLinkedToAddressInFirebase = await twitterHandleAlreadyLinked(
            twitterUsername,
            address
          );

          if (!isTwitterHandleLinkedToAddressInFirebase) {
            await linkTwitterHandleToEthAddressInFirebase(
              twitterUsername,
              address,
              null /* The hxHash is null here, since the transaction happened in the past */
            );
          }
          // TODO: check that the firebase function was successful. Now just assuming it is ok. Should be ok if nothing changes.
          setCanVoteViaTwitter(true);
        }
      });
    }
  }, [canVoteWithDelegate]);

  let calcCurrentVote = () => {
    try {
      let currentVote = votes.filter(
        (vote) => vote['id'].split('-')[0] == currentIteration
      );
      let voteId = currentVote[0]['id'].split('-')[1];
      return voteId;
    } catch (err) {
      console.warn('No votes yet', err);
      return -1;
    }
  };

  const currentVoteId = calcCurrentVote();

  let [votedProposal, setVotedProposal] = useState(undefined);

  useEffect(() => {
    let filteredProposal = proposals.filter((proposal) => {
      return proposal.id == currentVoteId;
    });
    setVotedProposal(filteredProposal[0]);
  }, [currentVoteId, proposals]);

  let calcHasVotedOnThisIteration = () => {
    try {
      const hasVotedThisIteration = votes.some(
        (vote) => vote['id'].split('-')[0] == currentIteration
      );
      return hasVotedThisIteration;
    } catch {
      return null;
    }
  };

  let hasVotedOnThisIteration = calcHasVotedOnThisIteration();

  useEffect(() => {
    hasVotedOnThisIteration = calcHasVotedOnThisIteration();
  }, [currentIteration, votes]);

  let newToThisIteration = lastIterationJoinedOrLeft == currentIteration;

  let votingAllowed =
    !newToThisIteration &&
    !hasVotedOnThisIteration &&
    daiDeposit > 0 &&
    hasAProposal === false;

  return (
    <Page className={classes.root} title="dao.care | All Proposals">
      <div style={{ position: 'absolute', top: 6, right: 10 }}>
        {/* {  //temp hiding this until twitter voting comes back
        {status === 'DRAFT' && !enabledTwitter && connected && daiDeposit > 0 && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<TwitterIcon />}
            onClick={enableTwitter}
          >
            Enable Twitter voting
          </Button>
        )}
        {status === '3BOX_VERIFICATION' && (
          <Typography variant="caption">
            Verifying 3Box twitter
            <EllipsisLoader />
          </Typography>
        )}
        {status === '3BOX_VERIFIED' && (
          <Typography variant="caption">
            Enabling twitter voting
            <EllipsisLoader />
          </Typography>
        )}
        {canVoteWithDelegate &&
          (canVoteViaTwitter ? (
            <Typography variant="caption">
              You can now vote with twitter
            </Typography>
          ) : (
            <Typography variant="caption">
              Voting on twitter has been enabled, validating on backend
              <EllipsisLoader />
            </Typography>
          ))}
        {status === '3BOX_FAILED' && (
          <Typography variant="caption" style={{ color: '#FF9494' }}>
            3Box twitter verification failed
          </Typography>
        )}
        {status === 'TX_FAILED' && (
          <Typography variant="caption" style={{ color: '#FF9494' }}>
            Transaction failed, please check your wallet.{' '}
          </Typography>
        )}
} */}
      </div>
      <Header />
      {daiDeposit === 0 && connected && (
        <>
          <Typography variant="body2" className={classes.decriptionBlurb}>
            Deposit funds in the pool in order to vote on your favourite
            proposal
          </Typography>
          <div style={{ margin: '16px 0px' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              startIcon={<DepositIcon />}
              onClick={() => {
                router.history.push('/deposit');
              }}
            >
              Deposit
            </Button>
          </div>
        </>
      )}
      {hasVotedOnThisIteration == true && votedProposal != undefined && (
        <>
          <Typography variant="h5" className={classes.title}>
            Your vote
          </Typography>
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <ProposalCard
              proposal={votedProposal}
              votingAllowed={false}
              twitterAllowed={false}
              address={address}
            />
          </div>
        </>
      )}
      <Typography variant="h5">All Proposals</Typography>
      <div style={{ marginTop: 16 }}>
        {fetched && proposals.length > 0 && (
          <>
            <Grid container justify="space-evenly" spacing={4}>
              {proposals.map((proposal) => {
                return (
                  <Grid key={proposal.id} item>
                    <div className={classes.card}>
                      <ProposalCard
                        proposal={proposal}
                        votingAllowed={votingAllowed}
                        twitterAllowed={!connected || votingAllowed}
                        vote={daoContract.vote}
                        isPreviousWinner={lastWinner == proposal.id}
                        address={address}
                      />
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
        {fetched && proposals.length === 0 && (
          <Typography variant="caption" align="center">
            No proposals available
          </Typography>
        )}
        {!fetched && (
          <Typography variant="caption" align="center">
            Loading proposals
            <EllipsisLoader />
          </Typography>
        )}
      </div>
    </Page>
  );
};

Proposals.propTypes = {
  className: PropTypes.string,
};

export default Proposals;
