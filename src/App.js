import React,  {Component} from 'react';
import Navbar  from './components/navbar';
import Data  from './db.json';
import classes  from './App.module.css';
class App extends Component {

state = {
errors : Data.data,

filter : false,

searchdata : []
}


componentDidMount(){

  // Loop Through the Logdata
     let data = this.state.errors;
     let Output = [];

     for (let i = 0; i < data.length; i++) {

         let index = GetIndexIfLogExists(data[i],Output) ;
                 if(index >= 0)
         {
             Output[index].message += "\n"+data[i].message;
         }
         else
         {
             Output.push(data[i]);
         }

     }

  // Check whether the log already preset if yes send the index
  function GetIndexIfLogExists(value, arr) {
     let index = -1;
     for (let i = 0; i < arr.length; i++) {

         if (arr[i].facility === value.facility &&
             arr[i].level === value.level &&
             arr[i].timeStamp === value.timeStamp
         ) {
             index = i;
             break
         }
     }
     return index;
  }


  //removing duplications from logs
  let results = Output.filter(function (a) {
  return !this[a.message] && (this[a.message] = true);

  }, Object.create(null));


// setting the state
this.setState({

errors: results

})

}





// for filtering of records on UI

filterHandler =(e) => {
let res = null;


// for facility

if(e.target.value === "GF::afml" ||  e.target.value === "GF::eai:eproduct"){
   res = this.state.errors.filter( (data) => (data.facility === e.target.value) )

  this.setState({

  searchdata:  res ,
    filter : true
  })

}

 // for level
else if (e.target.value === "Notice" ||  e.target.value === "Debug") {

res = this.state.errors.filter( (data) => (data.level === e.target.value) )

 this.setState({

 searchdata:  res ,
 filter : true
 })
}



// for TimeStamp

else if (e.target.value === "2019-02-04T20:51:54.685Z" ||
e.target.value === "2019-02-05T20:52:05.057Z" ||
e.target === "2019-02-05T20:52:05.058Z" ||
e.target.value === "2019-02-05T20:52:05.059Z" ||
e.target.value === "2019-02-05T20:52:05.060Z" ||
e.target.value === "2019-02-05T20:52:05.061Z" ||
e.target.value === "2019-02-05T20:52:12.705Z" )
{

res = this.state.errors.filter( (data) => (data.timeStamp === e.target.value) )

 this.setState({

 searchdata:  res ,
 filter : true
 })
}

// if e.target.value is empty
else{
this.setState({
filter : false
  })}


}


render() {

  // moving message to a new line

  function textToHtml(html)
  {
    let arr = html.split(/<br\s*\/?>/i);
    return arr.reduce((el, a) => el.concat(a, <br />), []);
  }


 // mapping the entire array

let showingLog = this.state.searchdata.map( (data , index) => ( <>

<div className={classes.title}>
    <span > Facility:  {data.facility} </span>
    <span> Level:  {data.level} </span>
  </div>
  <b>Error Messages !</b>
<p key={data[index]}> {textToHtml(data.message.split('\n').join('<br/>'))} </p>



<p className = {classes.time}> TimeStamp:  {data.timeStamp}  </p>
<hr className={classes.hr}/>
</>
));


  return (


<React.Fragment>

<Navbar/>

<center>
<div className= {classes.filters}>
<h1>Search Your Log!</h1>
<label>Select facility: </label>
<select onChange={(e) => this.filterHandler(e)}>
  <option value="" ></option>
  <option value="GF::afml">GF::afml</option>
  <option value="GF::eai:eproduct">GF::eai:eproduct</option>

</select>

<label>Select level: </label>

<select onChange={(e) => this.filterHandler(e)}>
<option value=""></option>
  <option value="Notice">Notice</option>
  <option value="Debug">Debug</option>

</select>


<label>Select TimeStamp: </label>

<select onChange={(e) => this.filterHandler(e)}>
<option value=""></option>
  <option value="2019-02-04T20:51:54.685Z">2019-02-04T20:51:54.685Z</option>
  <option value="2019-02-05T20:52:05.057Z">2019-02-05T20:52:05.057Z</option>
    <option value="2019-02-05T20:52:05.058Z">2019-02-05T20:52:05.058Z</option>
    <option value="2019-02-05T20:52:05.059Z"> 2019-02-05T20:52:05.059Z</option>
      <option value="2019-02-05T20:52:05.060Z"> 2019-02-05T20:52:05.060Z </option>
      <option value="2019-02-05T20:52:05.061Z"> 2019-02-05T20:52:05.061Z   </option>
            <option value="2019-02-05T20:52:12.705Z">2019-02-05T20:52:12.705Z </option>
</select>






  </div>

<div className ={classes.results}>

    {this.state.filter ?  showingLog : (<>
      <h2>Please Select Options Above! </h2>
      <div className={classes.loader}></div> </>

   )}

</div>
</center>
</React.Fragment>



  );
}


}

export default App;
