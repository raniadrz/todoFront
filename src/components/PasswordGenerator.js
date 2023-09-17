import { Autorenew, FileCopy } from '@mui/icons-material';
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Slider,
    TextField,
    Typography,
} from '@mui/material';
import React, { Component } from 'react';
import "../styles/generator.scss"; // Import the CSS file

class PasswordGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 12,           // Default password length
      includeDigits: true,  // Include digits in the password
      includeSymbols: true, // Include symbols in the password
      password: '',
    };
  }

  generatePassword = () => {
    const { length, includeDigits, includeSymbols } = this.state;
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const symbolChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';

    let validChars = lowercaseChars + uppercaseChars;

    if (includeDigits) {
      validChars += digitChars;
    }

    if (includeSymbols) {
      validChars += symbolChars;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      newPassword += validChars.charAt(randomIndex);
    }

    this.setState({ password: newPassword });
  };

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: newValue });
  };

  handleLengthChange = (event, newValue) => {
    this.setState({ length: newValue });
  };


  copyToClipboard = () => {
    const { password } = this.state;

    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard');
    });
  };

  render() {
    const { length, includeDigits, includeSymbols, password} = this.state;

    return (
     <div className="generator">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Generate a Secure Password</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography id="password-length-slider" gutterBottom>
            Password Length: {length}
          </Typography>
          <Slider
            name="length"
            value={length}
            onChange={this.handleLengthChange}
            min={6}
            max={24}
            valueLabelDisplay="auto"
            aria-labelledby="password-length-slider"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                name="includeDigits"
                checked={includeDigits}
                onChange={this.handleChange}
              />
            }
            label="Include Digits"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                name="includeSymbols"
                checked={includeSymbols}
                onChange={this.handleChange}
              />
            }
            label="Include Symbols"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Generated Password"
            value={password}
            fullWidth
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Copy password to clipboard"
                    onClick={this.copyToClipboard}
                  >
                    <FileCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Autorenew />}
            onClick={this.generatePassword}
          >
            Generate Password
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FileCopy />}
            onClick={this.copyToClipboard}
          >
            Copy Password
          </Button>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default PasswordGenerator;
