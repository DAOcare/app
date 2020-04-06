import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import WithdrawIcon from '@material-ui/icons/RemoveCircle';
import { Page } from '../../components';
import Header from '../../components/Header/Header';
import LoadingWeb3 from '../../components/LoadingWeb3/LoadingWeb3';
import EllipsisLoader from '../../components/EllipsisLoader/EllipsisLoader';
import useRouter from '../../utils/useRouter';
import useWeb3Connect from '../../utils/useWeb3Connect';
import { useRedirectHomeIfNoEthAccount } from '../../utils/useCommonUtils';
import { useForm } from 'react-hook-form';

const BN = require('bn.js');

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  decriptionBlurb: { margin: '16px 0' },
  textField: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
  fieldGroup: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      marginTop: theme.spacing(1),
    },
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  wrapper: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(2),
  },
  statusMsg: {
    marginLeft: 16,
  },
  button: {
    width: 190,
  },
}));

const Deposit = () => {
  const [status, setStatus] = useState('DRAFT');
  const classes = useStyles();
  const router = useRouter();
  const web3Connect = useWeb3Connect();

  useRedirectHomeIfNoEthAccount();

  const { register, handleSubmit, watch /* , errors  */ } = useForm();
  let amount = watch('amount') ? watch('amount') : 0;
  let balance = Number(web3Connect.daiBalance);

  const onSubmit = async (data) => {
    let { amount } = data;
    setStatus(`DEPOSITING`);
    await web3Connect.contracts.dao.methods.triggerDeposit(amount);
    setStatus('DEPOSITED');
  };

  return (
    <Page className={classes.root} title="dao.care | Deposit">
      {web3Connect.loadingWeb3 ? (
        <LoadingWeb3 />
      ) : (
        <>
          <Header />

          {web3Connect.hasProposal ? (
            <Typography style={{ color: '#FF9494' }}>
              As an owner of a proposal, you are unable to join the pool and
              vote on proposals from the same address.
            </Typography>
          ) : web3Connect.daiDeposit > 0 && status == 'DRAFT' ? (
            <>
              <Typography variant="body1">
                You currently have {web3Connect.daiDeposit} in the fund. If you
                would like to add to your deposit we require that you first
                withdraw your current deposit. We do this to afford maximum
                smart contract security.
              </Typography>
              <div
                className={classes.divContainer}
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                  textAlign: 'center',
                }}
              >
                <Button
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<WithdrawIcon />}
                  onClick={() => {
                    router.history.push('/withdraw');
                  }}
                >
                  Withdraw
                </Button>
              </div>
            </>
          ) : (
            web3Connect.daiDeposit === 0 && (
              <>
                <Typography variant="body1" className={classes.decriptionBlurb}>
                  Deposit your DAI. Let your idle interest support community
                  projects. The amount of DAI you stake in the fund determines
                  the level of your voting power.
                </Typography>
                <Typography variant="h5">Deposit DAI</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box className={classes.fieldGroup}>
                    <TextField
                      // fullWidth
                      label="Amount"
                      name="amount"
                      variant="outlined"
                      inputRef={register({ required: true })}
                      className={classes.textField}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">DAI</InputAdornment>
                        ),
                      }}
                      style={{ width: 300 }}
                      helperText={`Balance: ${web3Connect.daiBalance} DAI | Deposit: ${web3Connect.daiDeposit} DAI`}
                    />
                    {(web3Connect.daiAllowance === 0 ||
                      status === 'DAI_APPROVED' ||
                      status === 'APPROVING_DAI') && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          // className={classes.button}
                          style={{ width: 190, marginBottom: 22 }}
                          // type="submit"
                          disabled={
                            web3Connect.daiAllowance > 0 || status !== 'DRAFT'
                          } // TODO: update to 50Dai
                          onClick={async () => {
                            let execute = async () => {
                              setStatus('APPROVING_DAI');
                              await web3Connect.contracts.dai.methods.triggerDaiApprove(
                                new BN(999999)
                              );
                              setStatus('DAI_APPROVED');
                            };
                            execute();
                          }}
                        >
                          Allow DAI deposit
                        </Button>
                        {status === 'APPROVING_DAI' && (
                          <Typography
                            variant="body1"
                            component="span"
                            className={classes.statusMsg}
                            style={{ marginBottom: 22 }}
                          >
                            Allowing deposits of DAI
                            <EllipsisLoader />
                          </Typography>
                        )}
                        {(status === 'DAI_APPROVED' ||
                          web3Connect.daiAllowance > 0) && (
                          <Typography
                            variant="body2"
                            component="span"
                            className={classes.statusMsg}
                            style={{ marginBottom: 22 }}
                          >
                            Deposit of DAI enabled
                          </Typography>
                        )}
                      </>
                    )}
                  </Box>
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                      disabled={
                        (status !== 'DRAFT' && status !== 'DAI_APPROVED') ||
                        web3Connect.daiAllowance === 0 ||
                        balance < amount ||
                        balance === 0
                      }
                    >
                      Deposit
                    </Button>
                    {web3Connect.daiBalance < amount && (
                      <Typography
                        variant="body2"
                        component="span"
                        className={classes.statusMsg}
                        style={{ color: '#FF9494' }}
                      >
                        You don't have enough DAI on your wallet
                      </Typography>
                    )}
                    {status === 'DEPOSITING' && (
                      <Typography
                        variant="body2"
                        component="span"
                        className={classes.statusMsg}
                      >
                        Depositing {amount} DAI...
                      </Typography>
                    )}
                    {status === 'DEPOSITED' && (
                      <Typography
                        variant="body2"
                        component="span"
                        className={classes.statusMsg}
                      >
                        Your funds have been deposited, thank you!
                      </Typography>
                    )}
                  </div>
                  <div
                    className={classes.divContainer}
                    style={{
                      marginTop: 24,
                      marginBottom: 24,
                      textAlign: 'center',
                    }}
                  >
                    <Button
                      // variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      startIcon={<HowToVoteIcon />}
                      onClick={() => {
                        router.history.push('/proposals');
                      }}
                    >
                      Vote
                    </Button>
                  </div>
                  {/* </Box> */}
                </form>
              </>
            )
          )}
        </>
      )}
    </Page>
  );
};

Deposit.propTypes = {
  className: PropTypes.string,
};

export default Deposit;
