// importing all the necessary packages
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import axios from 'axios';
import './App.css';

// export class to index.js
export default class App extends React.Component {

  constructor(props) {
    super(props); // constructor

    this.state = {
      date: this.getCurrentDate(), // default date
      value: 1, // default currency value
      cache: [
        { "cc": "AED", "symbol": "\u062f.\u0625;", "name": "UAE dirham" },
        { "cc": "AFN", "symbol": "Afs", "name": "Afghan afghani" },
        { "cc": "ALL", "symbol": "L", "name": "Albanian lek" },
        { "cc": "AMD", "symbol": "AMD", "name": "Armenian dram" },
        { "cc": "ANG", "symbol": "NA\u0192", "name": "Netherlands Antillean gulden" },
        { "cc": "AOA", "symbol": "Kz", "name": "Angolan kwanza" },
        { "cc": "ARS", "symbol": "$", "name": "Argentine peso" },
        { "cc": "AUD", "symbol": "$", "name": "Australian dollar" },
        { "cc": "AWG", "symbol": "\u0192", "name": "Aruban florin" },
        { "cc": "AZN", "symbol": "AZN", "name": "Azerbaijani manat" },
        { "cc": "BAM", "symbol": "KM", "name": "Bosnia and Herzegovina konvertibilna marka" },
        { "cc": "BBD", "symbol": "Bds$", "name": "Barbadian dollar" },
        { "cc": "BDT", "symbol": "\u09f3", "name": "Bangladeshi taka" },
        { "cc": "BGN", "symbol": "BGN", "name": "Bulgarian lev" },
        { "cc": "BHD", "symbol": ".\u062f.\u0628", "name": "Bahraini dinar" },
        { "cc": "BIF", "symbol": "FBu", "name": "Burundi franc" },
        { "cc": "BMD", "symbol": "BD$", "name": "Bermudian dollar" },
        { "cc": "BND", "symbol": "B$", "name": "Brunei dollar" },
        { "cc": "BOB", "symbol": "Bs.", "name": "Bolivian boliviano" },
        { "cc": "BRL", "symbol": "R$", "name": "Brazilian real" },
        { "cc": "BSD", "symbol": "B$", "name": "Bahamian dollar" },
        { "cc": "BTN", "symbol": "Nu.", "name": "Bhutanese ngultrum" },
        { "cc": "BWP", "symbol": "P", "name": "Botswana pula" },
        { "cc": "BYR", "symbol": "Br", "name": "Belarusian ruble" },
        { "cc": "BZD", "symbol": "BZ$", "name": "Belize dollar" },
        { "cc": "CAD", "symbol": "$", "name": "Canadian dollar" },
        { "cc": "CDF", "symbol": "F", "name": "Congolese franc" },
        { "cc": "CHF", "symbol": "Fr.", "name": "Swiss franc" },
        { "cc": "CLP", "symbol": "$", "name": "Chilean peso" },
        { "cc": "CNY", "symbol": "\u00a5", "name": "Chinese/Yuan renminbi" },
        { "cc": "COP", "symbol": "Col$", "name": "Colombian peso" },
        { "cc": "CRC", "symbol": "\u20a1", "name": "Costa Rican colon" },
        { "cc": "CUC", "symbol": "$", "name": "Cuban peso" },
        { "cc": "CVE", "symbol": "Esc", "name": "Cape Verdean escudo" },
        { "cc": "CZK", "symbol": "K\u010d", "name": "Czech koruna" },
        { "cc": "DJF", "symbol": "Fdj", "name": "Djiboutian franc" },
        { "cc": "DKK", "symbol": "Kr", "name": "Danish krone" },
        { "cc": "DOP", "symbol": "RD$", "name": "Dominican peso" },
        { "cc": "DZD", "symbol": "\u062f.\u062c", "name": "Algerian dinar" },
        { "cc": "EEK", "symbol": "KR", "name": "Estonian kroon" },
        { "cc": "EGP", "symbol": "\u00a3", "name": "Egyptian pound" },
        { "cc": "ERN", "symbol": "Nfa", "name": "Eritrean nakfa" },
        { "cc": "ETB", "symbol": "Br", "name": "Ethiopian birr" },
        { "cc": "EUR", "symbol": "\u20ac", "name": "European Euro" },
        { "cc": "FJD", "symbol": "FJ$", "name": "Fijian dollar" },
        { "cc": "FKP", "symbol": "\u00a3", "name": "Falkland Islands pound" },
        { "cc": "GBP", "symbol": "\u00a3", "name": "British pound" },
        { "cc": "GEL", "symbol": "GEL", "name": "Georgian lari" },
        { "cc": "GHS", "symbol": "GH\u20b5", "name": "Ghanaian cedi" },
        { "cc": "GIP", "symbol": "\u00a3", "name": "Gibraltar pound" },
        { "cc": "GMD", "symbol": "D", "name": "Gambian dalasi" },
        { "cc": "GNF", "symbol": "FG", "name": "Guinean franc" },
        { "cc": "GQE", "symbol": "CFA", "name": "Central African CFA franc" },
        { "cc": "GTQ", "symbol": "Q", "name": "Guatemalan quetzal" },
        { "cc": "GYD", "symbol": "GY$", "name": "Guyanese dollar" },
        { "cc": "HKD", "symbol": "HK$", "name": "Hong Kong dollar" },
        { "cc": "HNL", "symbol": "L", "name": "Honduran lempira" },
        { "cc": "HRK", "symbol": "kn", "name": "Croatian kuna" },
        { "cc": "HTG", "symbol": "G", "name": "Haitian gourde" },
        { "cc": "HUF", "symbol": "Ft", "name": "Hungarian forint" },
        { "cc": "IDR", "symbol": "Rp", "name": "Indonesian rupiah" },
        { "cc": "ILS", "symbol": "\u20aa", "name": "Israeli new sheqel" },
        { "cc": "INR", "symbol": "\u20B9", "name": "Indian rupee" },
        { "cc": "IQD", "symbol": "\u062f.\u0639", "name": "Iraqi dinar" },
        { "cc": "IRR", "symbol": "IRR", "name": "Iranian rial" },
        { "cc": "ISK", "symbol": "kr", "name": "Icelandic kr\u00f3na" },
        { "cc": "JMD", "symbol": "J$", "name": "Jamaican dollar" },
        { "cc": "JOD", "symbol": "JOD", "name": "Jordanian dinar" },
        { "cc": "JPY", "symbol": "\u00a5", "name": "Japanese yen" },
        { "cc": "KES", "symbol": "KSh", "name": "Kenyan shilling" },
        { "cc": "KGS", "symbol": "\u0441\u043e\u043c", "name": "Kyrgyzstani som" },
        { "cc": "KHR", "symbol": "\u17db", "name": "Cambodian riel" },
        { "cc": "KMF", "symbol": "KMF", "name": "Comorian franc" },
        { "cc": "KPW", "symbol": "W", "name": "North Korean won" },
        { "cc": "KRW", "symbol": "W", "name": "South Korean won" },
        { "cc": "KWD", "symbol": "KWD", "name": "Kuwaiti dinar" },
        { "cc": "KYD", "symbol": "KY$", "name": "Cayman Islands dollar" },
        { "cc": "KZT", "symbol": "T", "name": "Kazakhstani tenge" },
        { "cc": "LAK", "symbol": "KN", "name": "Lao kip" },
        { "cc": "LBP", "symbol": "\u00a3", "name": "Lebanese lira" },
        { "cc": "LKR", "symbol": "Rs", "name": "Sri Lankan rupee" },
        { "cc": "LRD", "symbol": "L$", "name": "Liberian dollar" },
        { "cc": "LSL", "symbol": "M", "name": "Lesotho loti" },
        { "cc": "LTL", "symbol": "Lt", "name": "Lithuanian litas" },
        { "cc": "LVL", "symbol": "Ls", "name": "Latvian lats" },
        { "cc": "LYD", "symbol": "LD", "name": "Libyan dinar" },
        { "cc": "MAD", "symbol": "MAD", "name": "Moroccan dirham" },
        { "cc": "MDL", "symbol": "MDL", "name": "Moldovan leu" },
        { "cc": "MGA", "symbol": "FMG", "name": "Malagasy ariary" },
        { "cc": "MKD", "symbol": "MKD", "name": "Macedonian denar" },
        { "cc": "MMK", "symbol": "K", "name": "Myanma kyat" },
        { "cc": "MNT", "symbol": "\u20ae", "name": "Mongolian tugrik" },
        { "cc": "MOP", "symbol": "P", "name": "Macanese pataca" },
        { "cc": "MRO", "symbol": "UM", "name": "Mauritanian ouguiya" },
        { "cc": "MUR", "symbol": "Rs", "name": "Mauritian rupee" },
        { "cc": "MVR", "symbol": "Rf", "name": "Maldivian rufiyaa" },
        { "cc": "MWK", "symbol": "MK", "name": "Malawian kwacha" },
        { "cc": "MXN", "symbol": "$", "name": "Mexican peso" },
        { "cc": "MYR", "symbol": "RM", "name": "Malaysian ringgit" },
        { "cc": "MZM", "symbol": "MTn", "name": "Mozambican metical" },
        { "cc": "NAD", "symbol": "N$", "name": "Namibian dollar" },
        { "cc": "NGN", "symbol": "\u20a6", "name": "Nigerian naira" },
        { "cc": "NIO", "symbol": "C$", "name": "Nicaraguan c\u00f3rdoba" },
        { "cc": "NOK", "symbol": "kr", "name": "Norwegian krone" },
        { "cc": "NPR", "symbol": "NRs", "name": "Nepalese rupee" },
        { "cc": "NZD", "symbol": "NZ$", "name": "New Zealand dollar" },
        { "cc": "OMR", "symbol": "OMR", "name": "Omani rial" },
        { "cc": "PAB", "symbol": "B./", "name": "Panamanian balboa" },
        { "cc": "PEN", "symbol": "S/.", "name": "Peruvian nuevo sol" },
        { "cc": "PGK", "symbol": "K", "name": "Papua New Guinean kina" },
        { "cc": "PHP", "symbol": "\u20b1", "name": "Philippine peso" },
        { "cc": "PKR", "symbol": "Rs.", "name": "Pakistani rupee" },
        { "cc": "PLN", "symbol": "z\u0142", "name": "Polish zloty" },
        { "cc": "PYG", "symbol": "\u20b2", "name": "Paraguayan guarani" },
        { "cc": "QAR", "symbol": "QR", "name": "Qatari riyal" },
        { "cc": "RON", "symbol": "L", "name": "Romanian leu" },
        { "cc": "RSD", "symbol": "din.", "name": "Serbian dinar" },
        { "cc": "RUB", "symbol": "R", "name": "Russian ruble" },
        { "cc": "SAR", "symbol": "SR", "name": "Saudi riyal" },
        { "cc": "SBD", "symbol": "SI$", "name": "Solomon Islands dollar" },
        { "cc": "SCR", "symbol": "SR", "name": "Seychellois rupee" },
        { "cc": "SDG", "symbol": "SDG", "name": "Sudanese pound" },
        { "cc": "SEK", "symbol": "kr", "name": "Swedish krona" },
        { "cc": "SGD", "symbol": "S$", "name": "Singapore dollar" },
        { "cc": "SHP", "symbol": "\u00a3", "name": "Saint Helena pound" },
        { "cc": "SLL", "symbol": "Le", "name": "Sierra Leonean leone" },
        { "cc": "SOS", "symbol": "Sh.", "name": "Somali shilling" },
        { "cc": "SRD", "symbol": "$", "name": "Surinamese dollar" },
        { "cc": "SYP", "symbol": "LS", "name": "Syrian pound" },
        { "cc": "SZL", "symbol": "E", "name": "Swazi lilangeni" },
        { "cc": "THB", "symbol": "\u0e3f", "name": "Thai baht" },
        { "cc": "TJS", "symbol": "TJS", "name": "Tajikistani somoni" },
        { "cc": "TMT", "symbol": "m", "name": "Turkmen manat" },
        { "cc": "TND", "symbol": "DT", "name": "Tunisian dinar" },
        { "cc": "TRY", "symbol": "TRY", "name": "Turkish new lira" },
        { "cc": "TTD", "symbol": "TT$", "name": "Trinidad and Tobago dollar" },
        { "cc": "TWD", "symbol": "NT$", "name": "New Taiwan dollar" },
        { "cc": "TZS", "symbol": "TZS", "name": "Tanzanian shilling" },
        { "cc": "UAH", "symbol": "UAH", "name": "Ukrainian hryvnia" },
        { "cc": "UGX", "symbol": "USh", "name": "Ugandan shilling" },
        { "cc": "USD", "symbol": "US$", "name": "United States dollar" },
        { "cc": "UYU", "symbol": "$U", "name": "Uruguayan peso" },
        { "cc": "UZS", "symbol": "UZS", "name": "Uzbekistani som" },
        { "cc": "VEB", "symbol": "Bs", "name": "Venezuelan bolivar" },
        { "cc": "VND", "symbol": "\u20ab", "name": "Vietnamese dong" },
        { "cc": "VUV", "symbol": "VT", "name": "Vanuatu vatu" },
        { "cc": "WST", "symbol": "WS$", "name": "Samoan tala" },
        { "cc": "XAF", "symbol": "CFA", "name": "Central African CFA franc" },
        { "cc": "XCD", "symbol": "EC$", "name": "East Caribbean dollar" },
        { "cc": "XDR", "symbol": "SDR", "name": "Special Drawing Rights" },
        { "cc": "XOF", "symbol": "CFA", "name": "West African CFA franc" },
        { "cc": "XPF", "symbol": "F", "name": "CFP franc" },
        { "cc": "YER", "symbol": "YER", "name": "Yemeni rial" },
        { "cc": "ZAR", "symbol": "R", "name": "South African rand" },
        { "cc": "ZMK", "symbol": "ZK", "name": "Zambian kwacha" },
        { "cc": "ZWR", "symbol": "Z$", "name": "Zimbabwean dollar" }
      ], // currency list included in app.js to dispense repetitive requests for known data
      from: "HKD", // default currency unit
      to: "USD", // default currency unit to be exchanged
      result: 0.129028, // default result  
      sig: 3, // precision
      open: false, // the status of result notification box
    };
  }

// list of handlers

  onDateChange = (event) => {
    this.setState({
      date: event.target.value.replace(/([/])/g, "-"),
    });
  };

  onValueChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  onFromChange = (event) => {
    this.setState({
      from: event.target.value,
    });
  };

  onToChange = (event) => {
    this.setState({
      to: event.target.value,
    });
  };

  onSigChange = (event) => {
    this.setState({
      sig: event.target.value,
    });
  };

// self-defined functions for data formatting

  abs(value) {
    return ((value >= 0) ? value : -value)
  }

  getCurrentDate() {
    var date = new Date(),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  handleClick = () => {
    var allCorrect = true;
    var today = false;
    var link = "";

// data formatting and validation

    if (this.state.value <= 0) {
      allCorrect = false;
      alert("Request aborted. Please enter a positive number.");
    }
    else if (this.state.date > this.getCurrentDate() || this.state.date.length !== 10) {
      allCorrect = false;
      alert("Request aborted. This app cannot predict future. Please enter a valid date as the reference day for currency exchange rates.");
    }

    if (this.state.date === this.getCurrentDate()) {
      today = true;
      link = "latest.json" + "?app_id=b8a37c9607704206864eb579809f1e98" + "{" + this.state.from + "," + this.state.to + "}";
    }

    if (allCorrect && today === false) {
      link = "historical!" + this.state.date + ".json" + "?app_id=b8a37c9607704206864eb579809f1e98" + "{" + this.state.from + "," + this.state.to + "}";
    }

    if (allCorrect){
      // going to backend
      axios.get(`/getRate/${link}`).then(response => { this.setState({ result: response.data.temp * this.state.value }) })
      // allow result notification box to be displayed
      this.setState({ open: true });
    }
  };

  handleClose = () => {
// not allow result notification box to be displayed
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div class="primary-form"> // main interface
        <div>

          <React.Fragment>
            <AppBar position="fixed">
              <Toolbar><label>Currency Exchange Rate Query Services</label></Toolbar>
            </AppBar>
          </React.Fragment>

          <label>Fill in the Currency Exchange Data Query Form<br /><br /></label>

          <TextField id="date" type="date" label="Reference Date" value={this.state.date} onChange={this.onDateChange} />&nbsp;
          <TextField id="amount" type="number" label="Currency Amount" value={this.state.value} onChange={this.onValueChange} />&nbsp;
          <TextField id="sig" type="number" label="Result correct to sig fig" value={this.state.sig} onChange={this.onSigChange} />
          <br /><br />


          <Select
            id="from"
            label="Converting from"
            value={this.state.from}
            onChange={this.onFromChange}
          >
            {this.state.cache.map((e) =>
              <MenuItem value={e.cc}>Converting From {e.name}</MenuItem>
            )}
          </Select>
          &nbsp;

          <Select
            id="to"
            label="Converting to"
            value={this.state.to}
            onChange={this.onToChange}
          >
            {this.state.cache.map((e) =>
              <MenuItem value={e.cc}>To {e.name}</MenuItem>
            )}
          </Select>
          <br /> <br />

          <Button variant="contained" color="primary" onClick={this.handleClick}>
            Convert
          </Button>&nbsp; &nbsp; &nbsp;

          <br /> <br />

          <Dialog onClose={this.handleClose} aria-labelledby="result" open={this.state.open}>  //result notification box
            <DialogTitle id="result">Result</DialogTitle>
            <DialogContent>
              You can get {this.state.result.toFixed(this.abs(this.state.sig))} {this.state.to} by converting {this.state.value} {this.state.from} to {this.state.to} on {this.state.date}. <br /> Press any area outside the dialog or the close button to dismiss it.<br /><br />
              <Button variant="contained" color="primary" onClick={this.handleClose}>
                Close
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

