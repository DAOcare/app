import React, { Component } from 'react';

import { getIpfsUrl, getIpfs } from '../modules/ipfs';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

const styles = (theme) => ({
  button: {
    width: 200,
  },
  input: {
    display: 'none',
  },
  wrapper: {
    position: 'relative',
    width: 200,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class IpfsUpload extends Component {
  //TODO: refactor to functional component
  constructor(props) {
    super(props);

    this.captureFile = this.captureFile.bind(this);
    this.convertToBuffer = this.convertToBuffer.bind(this);
    this.uploadFile = this.uploadFile.bind(this);

    this.state = {
      url: '',
      buffer: undefined,
      ipfsHash: undefined,
      status: undefined,
      fileName:
        this.props.value === '' ? this.props.placeholder : this.props.value,
    };
  }

  captureFile(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    this.setState({ fileName: file.name });
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      await this.convertToBuffer(reader);
      this.uploadFile();
    };
  }

  convertToBuffer = async (reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    await this.setState({ buffer: buffer });
  };

  uploadFile() {
    // event.preventDefault();
    let ipfs = getIpfs();
    this.setState({ status: 'UPLOADING' });
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
    ipfs.add(this.state.buffer, (err, ipfsHash) => {
      //setState by setting ipfsHash to ipfsHash[0].hash
      let hash = ipfsHash[0].hash;
      let url = getIpfsUrl(hash);
      this.setState({
        hash: hash,
        url: url,
        status: 'UPLOADED',
      });
      this.props.fileUploadedCB(url, hash);
    });
  }

  render() {
    // let uploadDisabled = this.state.buffer === undefined ? 'disabled' : '';
    let uploading = this.state.status === 'UPLOADING';
    let uploaded = this.state.status === 'UPLOADED';
    // let buttonLabel = uploading ? "Uploading..." : "Upload to IPFS";
    // let status = uploaded ? " File successfully uploaded to IPFS" : '';
    let caption = this.props.caption ? this.props.caption : 'Select File';
    let classes = this.props.classes;
    return (
      // <div className="ipfs-upload-container">
      //     <input className="form-control-file" type="file" onChange={this.captureFile} />
      //     <button type="button" className="btn btn-secondary " onClick={this.uploadFile} disabled={uploadDisabled} >{buttonLabel}</button>
      //     {status !== '' &&
      //         <div><small><i className='fas fa-check success-icon'></i>{status}</small></div>
      //     }
      //     {/* {uploading && <center><small><i className="fas fa-spinner fa-pulse"></i> Uploading to IPFS...</small></center>} */}
      // </div>
      <div>
        <input
          accept="*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={this.captureFile}
        />
        <label htmlFor="contained-button-file">
          <Grid item className={classes.wrapper}>
            <Button
              variant="outlined"
              component="span"
              className={classes.button}
              disabled={uploading}
              color="secondary"
            >
              {caption}
            </Button>
            {uploading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Grid>
        </label>
        {uploading && (
          <Typography variant="caption">Uploading to IPFS...</Typography>
        )}
      </div>
    );
  }
}

IpfsUpload.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IpfsUpload);
