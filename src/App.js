import "./App.scss";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      inputValue: ''
    };
  }

  componentDidMount() {
    let a = fetch("https://restcountries.com/v3.1/all");
    a.then((value1) => {
      return value1.json();
    }).then((value2) => {
      this.setState({
        data: value2,
      });
    });
  }

  handleChange=()=>{
    // const searchKey = this.state.inputValue;
    // const url = `https://restcountries.com/v3.1/name/${ searchKey }?fullText=true`;

    // let a = fetch(url);
    // a.then((value1) => {
    //   return value1.json();
    // }).then((value2) => {
    //   if( value2.status  !== 404 ) {
    //     this.setState({
    //       data: value2,
    //     });
    //   }
    // });

    const searchKey = this.state.inputValue;
    const url = `https://restcountries.com/v3.1/name/${ searchKey}`;

    let a = fetch(url);
    a.then((value1) => {
      return value1.json();
    }).then((value2) => {
      if( value2.status  !== 404 ) {
        this.setState({
          data: value2,
        });
      }
    });


  // data.filter((item)=> 
  //   this.state.inputValue == item.name.common
  // )
  // this.setState({
  //   data:value2
  // });
}

 
  render() {
    const data = this.state.data;
    return (
      <div className="maincontent">
        <div className="maincontent__heading">
          <h1>
            <u>FIND COUNTRIES</u>
          </h1>
        </div>
        <div className="maincontent__subjectarea">
          <div className="maincontent__subjectarea__text">
            <h4>ENTER THE KEYWORDS TO FIND THE RELATED COUNTRIES.</h4>
          </div>
          <div className="maincontent__subjectarea__inputarea">
            <input type="text" className="maincontent__subjectarea__inputarea__text" placeholder="Enter keywords for countries" onChange={(e) => this.setState({inputValue : e.target.value})}/>
            <button
              type="submit" className="maincontent__subjectarea__inputarea__button" onClick={(e)=>this.handleChange(e)}>SEARCH</button>
          </div>
        </div>
        {data.map((item, itemIndex) => (
          <div key={ itemIndex } className="maincontent__card">
            <div className="maincontent__card__info">
              <div className="maincontent__card__info__name">
                {item.name.common} {item.flag}
              </div>
              <div className="maincontent__card__info__capital" >
                Capital : {item.capital}
              </div>
              <div className="maincontent__card__info__population">
                Population : {item.population}
              </div>
              {item.currencies && (
                <div className="maincontent__card__info__currencies">
                  Currencies : {Object.keys(item.currencies).map((key, i) => (<React.Fragment  key={ key }><span>{key}({item.currencies[key].name})</span><br/>
                   <span>Symbol : {item.currencies[key].symbol}</span></React.Fragment>
                    
                  ))}
                </div>
              )}
              <div className="maincontent__card__info__flag">
                 {item.flags.alt && <span>Info : {item.flags.alt}</span>}
                 {!item.flags.alt && <span>Info : "No Information Found"</span>}
              </div>
              {item.languages && (
              <div className="maincontent__card__info__languages">
                  Languages : {Object.keys(item.languages).map((key, i) => (<React.Fragment  key={ key }><span>{key}</span><span>({(item.languages[key])}) </span>
                   </React.Fragment>
                    
                  ))}
                </div>
              )}
            </div>
            <div className="maincontent__card__image">
              <img
                className="maincontent__card__image__image1"
                src={item.flags.png}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
