import React, {useEffect, useState} from "react";
import window from 'global'
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "../../utils/stripejs";
import { 
  Row, 
  Col,
  Card, 
  Statistic,
  message, 
  DatePicker, 
  TimePicker 
} from "antd";
import json_data from "../../json_data/data";
import dot from "../../images/bookride/dot.png";
import CardForm from "./CardForm";
import SearchLocationInput from "./ServiceLocationInput";
import SearchLocationInput2 from "./ServiceLocationInput2";
import moment from 'moment-timezone';
import {Fade} from 'react-reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faRoad, faMoneyCheckAlt, faCoffee } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const BookFormSnippet = () => {
  const stripePromise = getStripe();
  const [water, setWater] = useState(false);
  const [disabled_dates, setDisableData] = useState({});
  const [coffee, setCoffee] = useState(false);
  // const [disabled_dates, setDisabledDates] = useState(false);
  const [disableHours, setDisableHours] = useState([]);
  const [disableMinutes, setDisableMinutes] = useState([]);
  const [distance, setDistance] = useState({text:'0'});
  const [rideDuration, setRideDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [droppingOffLoction, setDroppingOffLoction] = useState('');
  const [pickingUpLoction, setPickingUpLoction] = useState('');
  const [nextStep, setNextStep] = useState(1);
  const [dayDiffer, setDayDiffer] = useState(1);
  const [locationFrom, setLocationFrom] = useState({lat:'', lng:''});
  const [valid, setValid] = useState(true);
  const [locationTo, setLocationTo] = useState({lat:'', lng:''});
  const [pickDate, setPickDate] = useState();
  const [pickTime, setPickTime] = useState();
  const [pickTimeValue, setPickTimeValue] = useState();
  const [personalInfo, setPersonalInfo] = useState({first_name:'', last_name:'', email:'', phone:''});
  const [cartValue, setCartValue] = useState({trip: 0, addon: 0});

  useEffect(() => {
    const carRateInitial = json_data.cars[0].rates.map( (rate, index) =>{
      let rateKey = Object.keys(rate);
      return (
        <li className="car-list" key={index}>
            <div className="radio">
              <input
                  type="radio"
                  onChange={(e) => {
                    updateCart( e,'trip', rate[rateKey]);
                  }}
                  className="attribute_radio"
                  id={rateKey}
                  value={rateKey}
                  name="duration"
              />
              <label htmlFor={rateKey}>{rateKey} ${rate[rateKey]}</label>
            </div>
          </li>
      )
    });
    //google Calendar Script Load
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
            }
        };
    }else {
      script.onload = () => console.log('script loaded');
  }

    script.src = `https://apis.google.com/js/api.js`;
    // document.body.appendChild(script);
    document.getElementsByTagName("head")[0].appendChild(script);

    // axios.get(`${process.env.GATSBY_API_URL}/google/disabled_dates.php`).then((response)=>{
    //   let disabled_dates=[];
    //   response.data && Object.keys(response.data).map((key)=>{
    //     disabled_dates.push(response.data[key])
    //   })
    //   setDisabledDates(disabled_dates)
    // })
    axios.get(`https://viprides.com.au/api/google/disabled_dates_test.php`).then((response)=>{
      // let data = JSON.parse(response.data)
      disabled_slots(response.data)
    });

  },[]);

  useEffect(() => {
    if(locationFrom.lat !== '' && locationTo.lat !== ''){
      var distanceService = new window.google.maps.DistanceMatrixService();
     distanceService.getDistanceMatrix({
        origins: [locationFrom],
        destinations: [locationTo],
        travelMode: 'DRIVING',
    },
    function (response, status) {
        if (status !== window.google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        } else {
            setDistance(response.rows[0].elements[0].distance);
            setRideDuration(response.rows[0].elements[0].duration && response.rows[0].elements[0].duration.value)
          }
    });
    }
  }, [locationFrom,locationTo])

  useEffect(() => {
    calculatePrice();
    let cart = cartValue;
    cart['trip'] = price;
    setCartValue(cart)
  }, [distance, price])
    
  function disabled_slots(data){
      data.length > 0 && data.map((booking_date)=>{
      let [booking_start, booking_end] = [new Date(booking_date['start']), new Date(booking_date['end'])]
      booking_end.setMinutes(booking_end.getMinutes()+30);
      let [start_day, start_month, start_year] = [booking_start.getDate(), booking_start.getMonth()+1, booking_start.getFullYear()]
      let [end_day, end_month, end_year] = [booking_end.getDate(), booking_end.getMonth()+1, booking_end.getFullYear()]
      let [start_hour, start_mint] = [booking_start.getHours(), booking_start.getMinutes()]
      let [end_hour, end_mint] = [booking_end.getHours(), booking_end.getMinutes()]
      addYear(start_year, end_year, start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint)
    })
  }
  function addYear(start_year, end_year, start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint){
    for(let year = start_year; year<=end_year; year++){
        let add_year = disabled_dates;
      if(year in disabled_dates){
      }else {
        add_year[year] = {}
      }
      addMonth(start_year, end_year, start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint, year)
    }
  }
  function addMonth(start_year, end_year, start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint, year){
    if(start_year === end_year){
      for(let month = start_month; month<=end_month; month++){
        let add_month = disabled_dates
        if(month in disabled_dates[year]){
        }else {
          add_month[year][month] = {};
        }
        setDisableData(add_month);
        addDay(start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month)
      }
    }else if(year === start_year && start_year !== end_year){
      for(let month = start_month; month<=12; month++){
        let add_month = disabled_dates
        if(month in disabled_dates[year]){
        }else {
          add_month[year][month] = {};
        }
        setDisableData(add_month);
        addDay(start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month)
      }
    }else if(year === end_year && start_year !== end_year){
      for(let month = 1; month<=end_month; month++){
        let add_month = disabled_dates
        if(month in disabled_dates[year]){
        }else {
          add_month[year][month] = {};
        }
        setDisableData(add_month);
        addDay(start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month)
      }
    }else{
      for(let month = 1; month<=12; month++){
        let add_month = disabled_dates
        if(month in disabled_dates[year]){
        }else {
          add_month[year][month] = {};
        }
        setDisableData(add_month);
        addDay(start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month)
      }
    }
  }
  function addDay(start_month, end_month, start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month){
    if(start_month === end_month){
      for(let day = start_day; day<=end_day; day++){
        let add_day = disabled_dates
        if(day in disabled_dates[year][month]){
        }else {
          add_day[year][month][day] = {}
        }
        setDisableData(add_day);
        addHour(start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month, day)
      }
    }else if(month === start_month && start_month !== end_month){
      for(let day = start_day; day<=getMonthLength(year, month); day++){
        let add_day = disabled_dates
        if(day in disabled_dates[year][month]){
        }else {
          add_day[year][month][day] = {}
        }
        setDisableData(add_day);
        addHour(start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month, day)
      }
    }else if(month === end_month && start_month !== end_month){
      for(let day = 1; day<=end_day; day++){
        let add_day = disabled_dates
        if(day in disabled_dates[year][month]){
        }else {
          add_day[year][month][day] = {}
        }
        setDisableData(add_day);
        addHour(start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month, day)
      }
    }else{
      for(let day = 1; day<=getMonthLength(year, month); day++){
        let add_day = disabled_dates
        if(day in disabled_dates[year][month]){
        }else {
          add_day[year][month][day] = {}
        }
        setDisableData(add_day);
        addHour(start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month, day)
      }
    }
  }
  function addHour(start_day, end_day, start_hour, end_hour, start_mint, end_mint, year, month, day){
    let add_hour = disabled_dates;
    if(start_day === end_day){
      for(let hour = start_hour; hour <= end_hour; hour++){
        if(hour in disabled_dates[year][month][day]){
        }else {
          add_hour[year][month][day][hour] = []
        }
        setDisableData(add_hour);
        addMint(start_hour, end_hour, start_mint, end_mint, year, month, day, hour)
      }
    }else if(day === start_day && start_day !== end_day){
      for(let hour = start_hour; hour < 24; hour++){
        if(hour in disabled_dates[year][month][day]){
        }else {
          add_hour[year][month][day][hour] = []
        }
        setDisableData(add_hour);
        addMint(start_hour, end_hour, start_mint, end_mint, year, month, day, hour)
      }
    }else if(day === end_day && start_day !== end_day){
      for(let hour = 0; hour <= end_hour; hour++){
        if(hour in disabled_dates[year][month][day]){
        }else {
          add_hour[year][month][day][hour] = []
        }
        setDisableData(add_hour);
        addMint(start_hour, end_hour, start_mint, end_mint, year, month, day, hour)
      }
    }else{
      for(let hour = 0; hour < 24; hour++){
        if(hour in disabled_dates[year][month][day]){
        }else {
          add_hour[year][month][day][hour] = []
        }
        setDisableData(add_hour);
        addMint(start_hour, end_hour, start_mint, end_mint, year, month, day, hour)
      }
    }
  }
  function addMint(start_hour, end_hour, start_mint, end_mint, year, month, day, hour){
    let add_mint = disabled_dates;
    if(start_hour === end_hour){
      for(let mint = start_mint; mint<=end_mint; mint++){
        if(mint in disabled_dates[year][month][day][hour]){
        }else {
          add_mint[year][month][day][hour].push(mint)
        }
        setDisableData(add_mint);
      }
    }else if(hour === start_hour && start_hour !== end_hour){
      for(let mint = start_mint; mint<60; mint++){
        if(mint in disabled_dates[year][month][day][hour]){
        }else {
          add_mint[year][month][day][hour].push(mint)
        }
        setDisableData(add_mint);
      }
    }else if(hour === end_hour && start_hour !== end_hour){
      for(let mint = 0; mint<=end_mint; mint++){
        if(mint in disabled_dates[year][month][day][hour]){
        }else {
          add_mint[year][month][day][hour].push(mint)
        }
        setDisableData(add_mint);
      }
    }else{
      for(let mint = 0; mint<60; mint++){
        if(mint in disabled_dates[year][month][day][hour]){
        }else {
          add_mint[year][month][day][hour].push(mint)
        }
        setDisableData(add_mint);
      }
    }
  }
  function getMonthLength(year, month){
    return new Date(year, month, 0).getDate();
  }
  function cartValues(){
    return <div className="site-statistic-demo-card" style={{marginTop:'2vw'}}>
    <Row gutter={16}>
      <Col sm={24} md={8}>
        <Card>
          <Statistic
            
            title={"Total Distance"}
            value={` ${distance.text}`}
            prefix={<FontAwesomeIcon 
              icon={ faRoad } 
            />}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            
            // suffix="%"
          />
        </Card>
      </Col>
      <Col sm={24} md={8}>
        <Card>
          <Statistic
            title="Cost by Distance"
            value={`$${price}`}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<FontAwesomeIcon 
              icon={ faMoneyCheckAlt } 
            />}
            // suffix="%"
          />
        </Card>
      </Col>
      <Col sm={24} md={8}>
        <Card>
          <Statistic
            title="Additional Service Charges"
            value={`$${cartValue.addon}`}
            precision={2}
            valueStyle={{ color: '#9B59B6' }}
            prefix={<FontAwesomeIcon 
              icon={ faCoffee } 
            />}
            // suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
  }
  function calculatePrice(){
    let dist = distance.text.replace(',', '');
    dist = parseInt(dist.replace(' KM',''))
    json_data.distance.map((data)=>{
      if(dist <= 3){
        setPrice((10))
      }
      else if(dist > 3){
            setPrice(((dist-3)*1.5+10))
        }
    })
  }
  const addons = json_data.addons.map( (addon, index) =>{
    let addonKey = Object.keys(addon);
    if(addonKey[0] !== undefined){
        var addonName = addonKey[0];
        var addonPrice = addon[addonName];
    }
    return  (
      <Col md={8} lg={6} xl={4} key={index}>
        <label className="checkbox_pointer" htmlFor={addonName}>
            <input
                onChange={(e) => {
                  updateCart( e,'addon', addon[addonKey[0]]);
                  if(addonName === 'Water'){
                    setWater(!water)
                  } else {
                    setCoffee(!coffee);
                  }
                }}
                type="checkbox"
                checked={addonName === 'Water' ? water : coffee}
                id={addonName}
                name="addons"
            />
            <span className="check_span"></span><img src={`/${addon.icon}`} alt={addonName} /> {addonName+' $'+addonPrice}
        </label>
      </Col>
    )
  });

  function handleNext (ev, value){
    ev.preventDefault();
    if(value === 2){
      var element = document.getElementById('third-section');
      element.classList.toggle("third-padding");
    }
    if(nextStep === 1){
      if(locationFrom.lat === ""){
        error('Please select a pickup location')
      } else if (locationTo.lat === ""){
        error('Please select destination location')
      } else if (!pickDate){
        error('Please select departure date')
      }else if(!pickTime){
        error('Please select a departure Time')
      }
      else{
        setNextStep(value);
      }
    } 
    else {
        setNextStep(value);
    }
  }

  const updateCart = (e, key, value) => {
    let val = cartValue.addon;
    if(e.target.id === 'Water' && water){
      val = val - value;
    }else if(e.target.id === 'Water' && !water){
      val = val + value;
    }else if(e.target.id === 'Coffee' && coffee){
      val = val - value;
    }else if(e.target.id === 'Coffee' && !coffee){
      val = val + value;
    }
    setCartValue((cartVal) => {
      return {...cartVal, [key]:val}
    });
  };

  function setLocation(location, key){
    if(key === "From"){
      setLocationFrom(location)
    }else if(key==="To"){
      setLocationTo(location)
    }else if(key==="droping"){
      setDroppingOffLoction(location)
    }else if(key==="picking"){
      setPickingUpLoction(location)
    }
  }
  const error = (msg) => {
    message.success({
      content: msg,
      className: 'alter_message',
      style: {
        marginTop: '200px',
        padding:'200px'
      },
    });
  
  };
  
  //set personal info
  function handleChange (e) {
    let info = personalInfo, key=e.target.name, value=e.target.value;
    info[key]=value;
    setPersonalInfo(info);
  };

  //google Calendar Code
  var gapi = window.gapi;
  var CLIENT_ID = '988139561817-udcpus8dpiikapm5ag04qc3i1s1r6l7h.apps.googleusercontent.com';
  // var API_KEY =  'AIzaSyBHu3UGL3rnuCKQZ4vTQbJOJvX7OZfij2Q';
  var SCOPES = "https://www.googleapis.com/auth/calendar";
  function addCalendarEvent(){
    let date = new Date(pickDate+"T"+pickTime)
    date.setSeconds(date.getSeconds() + rideDuration);
    var data = {
      time: pickDate+"T"+pickTime,
      date: date,
      summary: `Ride booking for ${personalInfo.first_name!==''? personalInfo.last_name !==''? personalInfo.first_name+" "+personalInfo.last_name : personalInfo.first_name:'----'}`,
      location: pickingUpLoction,
      droppingOffLoction: droppingOffLoction,
      coffee: coffee,
      water: water,
      distance: distance.text,
      price: price,
      additional_charges: cartValue.addon,
      description: "Thank you for being our valued customer. We are so grateful for the pleasure of serving you and hope we met your expectations.",
      name: personalInfo.first_name!==''? personalInfo.last_name !==''? personalInfo.first_name+" "+personalInfo.last_name : personalInfo.first_name:'----',
      email: personalInfo.email,
      phone: personalInfo.phone,
    };
    // let config = {
    //   data: JSON.stringify(data),
    // }
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    axios.post(`${process.env.GATSBY_API_URL}/google/quickstart.php`, JSON.stringify(data),axiosConfig)
      .then(res => {
        setNextStep(3);
        setPickingUpLoction('');
        setDroppingOffLoction('');
        setPickDate();
        setPickTime();
        setWater(false);
        setCoffee(false);
        setPersonalInfo({first_name:'', last_name:'', email:'', phone:''})
        setDistance({text:'0'});
        setRideDuration(0);
        setPrice(0);
        setCartValue({trip: 0, addon: 0});
        var element = document.getElementById('third-section');
        element.classList.toggle("third-padding");
        setTimeout(function (){
          setNextStep(1)
        }, 3000);
      }).catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }
  function onChange(date, dateString) {
    getDisabledHours(dateString)
    setPickDate(dateString);
    const date1 = new Date();
    const date2 = new Date(dateString);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    setDayDiffer(diffDays)
  }
  function updateTrip(){
    let value = cartValue;
    value['trip'] = price;
    setCartValue(value);
  }
  function onChangeTime(value){
    let timeInput = value && value._d.toTimeString().split(" ")
    if(timeInput && timeInput.length > 0){
      let time = timeInput[0];
      getDisabledMinutes(value.hour());
      let timeZone = timeInput[1].replace('GMT', '')
      timeZone = [timeZone.slice(0, 3), ':', timeZone.slice(3)].join('')
      if(time && timeZone){
        setPickTime(time+".000Z")
        setPickTimeValue(value);
      }else{
        setPickTime()
      }
    }else{
      setPickTime()
    }
  }
  function getDisabledHours(dateString) {
    let date = moment(dateString, 'YYYY-MM-DD');
    let [year, month, day] = [date.year(), date.month()+1, date.date()]
    let hours = [];
    let d_hours = disabled_dates[year] && disabled_dates[year][month] && disabled_dates[year][month][day];
    d_hours && Object.keys(d_hours).map((hour)=>{
      if(d_hours[hour] && d_hours[hour].length === 60){
        hours.push(parseInt(hour))
      }
    })
    setDisableHours(hours)
  }
  function getDisabledMinutes (selectedHour) {
    let date = moment(pickDate, 'YYYY-MM-DD');
    let [year, month, day] = [date.year(), date.month()+1, date.date()]
    let minutes = [];
    let d_minutes = disabled_dates[year] && disabled_dates[year][month] && disabled_dates[year][month][day];
    d_minutes && d_minutes[selectedHour] && d_minutes[selectedHour].map((mint)=>{
      minutes.push(parseInt(mint))
    })
    setDisableMinutes(minutes)
    
}
  return (
    <section id="third-section" className="third-section">
    <div className="container third-section-width">
      <Row gutter={16}>
          <Col sm={24} md={24} lg={24} xl={24} className="text-center heading-book-ride">
              <div style={{color:'white'}}><h1><em>BOOK YOUR</em><em className="sec_hd">RIDE</em></h1>
              <p>
                <img src={dot} alt="" style={{maxWidth: '16px'}} /> 
                Search Your Car 
                <img src={dot} alt="" style={{maxWidth: '16px'}} />
              </p>
              </div>
          </Col>
        <div className="booking-form">
          {/* <form> */}
          <Fade bottom cascade>
            <div className="form-group-1">
            {nextStep > 1 && nextStep < 3 && <Col xs={24} sm={24} md={24} lg={24}>
              <div className="back-arrow">
                <div style={{cursor:'pointer'}} onClick={()=>{
                    var element = document.getElementById('third-section');
                    element.classList.toggle("third-padding");
                    setNextStep(nextStep-1);
                  }}>
                    <FontAwesomeIcon 
                      icon={ faChevronLeft } 
                    /> Back
                </div>
              </div></Col>}
              {nextStep === 1 ? <>
                <Row gutter={16}>
                  <Col md={12}>
                    <div className="form-group" style={{textAlign:'left'}}>
                      <span className="form-label">Picking Up Location</span>
                     
                        <>
                        <SearchLocationInput 
                          className="form-control"
                          skipLoad={false} 
                          value={locationFrom}
                          setLocation={setLocation}
                          setValid={setValid}
                          value = {pickingUpLoction}
                          disabled={true}
                        />
                      {valid == false && <span className="text-danger" style={{fontWeight:'bold'}}>Please select a valid pickup location in Bedingo</span>}
                      </>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <span className="form-label">Dropping Off Location</span>
                      {locationFrom.lat !== '' ?
                          <SearchLocationInput2 
                              className="form-control"
                              skipLoad={true} 
                              setLocation={setLocation}
                              updateTrip={updateTrip}
                              value = {droppingOffLoction}
                          />
                          :
                      <input className="form-control" type="text" placeholder="Enter Place Name" disabled style={{opacity:'0.5', width:'100%'}}/>
                      }
                    </div>
                  </Col>
                </Row>
                <Row gutter={16} className="sec_row_design">
                  <Col md={12}>
                    <div className="form-group">
                      <span className="form-label">Pick Date</span>
                      <DatePicker 
                        className="form-control date_style"
                        value={pickDate && moment(pickDate, 'YYYY-MM-DD')}
                        onChange={onChange}
                        disabledDate={current => {
                          let [year, month, date] = [current.year(), current.month()+1, current.date()];
                          let c_date = disabled_dates[year] && disabled_dates[year][month] && disabled_dates[year][month][date];

                          if(current < moment().add(0, "day")){
                            return true; 
                          }else if(c_date){
                            let length = 0;
                            Object.keys(c_date).map((key)=>{
                              length = length+c_date[key].length;
                            })
                            return length >= 1440 ? true : false;
                          }
                          return false;
                          
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <span className="form-label">Pick time</span>
                      <TimePicker 
                        disabled={!pickDate} 
                        use12Hours 
                        format="h:mm A" 
                        minuteStep={5} 
                        className="form-control date_style"
                        onChange={(value) => {onChangeTime(value)}} 
                        disabledHours={() => disableHours} 
                        disabledMinutes = {()=>disableMinutes}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="form-group">
                  {/* <header> */}
                    <h4>
                      Drinks
                    </h4>
                  {/* </header> */}
                <div className="form-checkbox">
                 <div>{addons}</div> 
                </div>
              </div>
              </> 
              : nextStep === 2 ?
              <>
                <div className="form-group" style={{marginTop:'2vw'}}>
                  {cartValues()}
                  <Row gutter={16}>
                    <Col className="gutter-row" xs={24} sm={12} style={{marginTop:'10px'}}>
                      <span className="form-label" style={{color:'white'}}>First Name</span>
                      <input 
                        className="form-control" 
                        name="first_name" 
                        onChange={(e)=>{handleChange(e)}} 
                        type="text" 
                        defaultValue={personalInfo.first_name}
                        placeholder="First Name" 
                      />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} style={{marginTop:'10px'}}>
                      <span className="form-label" style={{color:'white'}}>Last Name</span>
                      <input 
                        className="form-control" 
                        name="last_name" 
                        defaultValue={personalInfo.last_name}
                        onChange={(e)=>{handleChange(e)}} 
                        type="text" 
                        placeholder="Last Name" />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} style={{marginTop:'10px'}}>
                      <span className="form-label" style={{color:'white'}}>Phone</span>
                      <input 
                        className="form-control" 
                        name="phone" 
                        onChange={(e)=>{handleChange(e)}} 
                        defaultValue={personalInfo.phone}
                        type="number" 
                        placeholder="Phone" />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} style={{marginTop:'10px'}}>
                      <span className="form-label" style={{color:'white'}}>Email</span>
                      <input 
                        className="form-control" 
                        name="email" 
                        defaultValue={personalInfo.email}
                        onChange={(e)=>{handleChange(e)}} 
                        type="email" 
                        placeholder="Email" />
                    </Col>
                  </Row>
                  <Row className="stripe-form">
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Elements stripe={stripePromise}>
                        <div className="DemoWrapper">
                          <div className="DemoPickerWrapper">
                            <div className="Demo"> 
                              <CardForm cart={cartValue} addCalendarEvent={addCalendarEvent}/>
                            </div>
                          </div>
                        </div> 
                      </Elements>
                    </Col>
                  </Row>
                </div>
              </> : <div className="done_message">
                      Your Booking has been Received
                    </div>}
            </div>
            <div className="col-md-8">
              <div className="form-btn">
                {
                  nextStep <=1 && <button type="button" className="submit-btn" onClick={(e)=>{handleNext(e, nextStep+1)}}>Next</button> 
                }
              </div>
            </div>
            </Fade>
          {/* </form> */}
        </div>
      </Row>
    </div>
      </section>
  )
}

export default BookFormSnippet