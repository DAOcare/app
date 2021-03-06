/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import useRouter from '../utils/useRouter';

const useStyles = makeStyles((theme) => ({
  pageInner: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    height: 'calc(100% - 32px)',
    width: 'calc(100% - 32px)',
    overflowY: 'auto',
    padding: 16,
  },
}));

const Page = (props) => {
  const { title, children } = props;
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'UA-139348292-4', {
        page_path: router.location.pathname,
        page_name: title,
      });
    }
  }, [title, router]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <meta charset="UTF-8" />
        <meta name="description" content="dao.care - no loss endowment fund" />
        <meta
          name="keywords"
          content="daocare, dao, blockchain, ethereum, no loss fund, endowment, defi"
        />
        <meta name="author" content="daocare" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="dao.care - no loss endowment fund"
        />
        <meta property="og:image" content="/assets/logo.svg" />
        {/* This might have to be a png or jpg */}
        <meta property="og:url" content="https://dao.care" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:image:alt" content={title} />
      </Helmet>
      <div className={classes.pageInner}>{children}</div>
    </React.Fragment>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Page;
