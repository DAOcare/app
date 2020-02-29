/* eslint-disable no-undef */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import useRouter from '../../utils/useRouter';

// import useRouter from 'utils/useRouter';
const Header = props => {
  const router = useRouter();
  return (
    <React.Fragment>
      <div style={{ marginBottom: 16 }}>
        <Typography
          gutterBottom
          variant="h4"
          style={{ marginTop: 16, cursor: 'pointer' }}
          onClick={() => {
            router.history.push('/');
          }}
        >
          Whoop Together
        </Typography>

        <Typography variant="body1" style={{ marginTop: 16 }}>
          Generate interests by saving DAI for a common good. Every week a new
          project is selected together by all participants and the earnings
          generated by the common pool is distributed for the winning proposal.
          This is a no-loss funding mechanisms and you will be able to get your
          money back at any time.
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Header;
