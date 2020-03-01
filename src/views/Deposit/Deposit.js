import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form';
import useRouter from '../../utils/useRouter';
import { uploadJson, getJson } from '../../modules/pinata';
import { Page, WalletProfile } from '../../components';
import Header from '../../components/Header';
import ImageUploader from 'react-images-upload';
import useWeb3Connect from '../../utils/useWeb3Connect';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
const BN = require('bn.js');

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.white
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '75%',
      minWidth: 180,
    },
    width: '100%',
    padding: theme.spacing(3),
  },
  title: {
    // marginBottom: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },

    // fontWeight: "0.8em"
    // minWidth: 150
  },
  subscribeButton: {
    // padding: theme.spacing(0, 1)
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
  hiddenImage: {
    display: 'none',
  },
  image: {
    display: 'block',
  },
  statusMsg: {
    marginLeft: 16,
  },
  button: {
    width: 190,
  },
}));

const Deposit = props => {
  const { className, ...rest } = props;
  const [status, setStatus] = useState('DRAFT');
  const classes = useStyles();
  const router = useRouter();
  const web3Connect = useWeb3Connect();

  useEffect(() => {
    if (web3Connect.loaded && !web3Connect.connected) {
      router.history.push('/');
    }
  }, [web3Connect]);

  const { register, handleSubmit, watch /* , errors  */ } = useForm();
  let amount = watch('amount') ? watch('amount') : 0;
  let balance = Number(web3Connect.daiBalance);
  console.log({ allowance: web3Connect.daiBalance, amount });
  const onSubmit = async data => {
    let { amount } = data;

    setStatus(`DEPOSITING`);
    // const { title, description } = data;
    console.log(data);

    // let body = { ...data, image };

    // let hash = await uploadJson(data.title, body);
    // setStatus('SUBMITTING_BLOCKCHAIN');

    // // console.log({ hash });
    // // let json = await getJson(hash);
    // // console.log({ json });
    await web3Connect.contracts.dao.methods.triggerDeposit(amount);

    setStatus('DEPOSITED');
  };

  return (
    <Page className={classes.root} title="Whoop Together | Deposit">
      <Header />
      <Typography variant="h5" className={classes.title}>
        Deposit DAI
      </Typography>
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
              endAdornment: <InputAdornment position="end">DAI</InputAdornment>,
            }}
            style={{ width: 190 }}
            helperText={`Balance: ${web3Connect.daiBalance} DAI`}
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
                disabled={web3Connect.daiAllowance > 0 || status !== 'DRAFT'} // TODO: update to 50Dai
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
                  Allowing deposits of DAI...
                </Typography>
              )}
              {(status === 'DAI_APPROVED' || web3Connect.daiAllowance > 0) && (
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
        {/* <Typography variant="body1" style={{ marginTop: 16 }}>
          In order to submit a proposol you need to stake {STAKING_AMOUNT} DAI.
        </Typography> */}

        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            disabled={
              (status !== 'DRAFT' && status !== 'DAI_APPROVED') ||
              web3Connect.daiAllowance == 0 ||
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
        {/* </Box> */}
      </form>
    </Page>
  );
};

Deposit.propTypes = {
  className: PropTypes.string,
};

export default Deposit;
