import { MapContainer, TileLayer,Popup,Marker, Circle } from 'react-leaflet'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MapIcon from '@mui/icons-material/Map';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react';
import {createTheme,ThemeProvider} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer';
import axios from 'axios';
import './App.css';
import data from "./csvjson.json"
import { Route } from '@mui/icons-material';


const theme  = createTheme({
  palette:{
      primary:{
        main:'#219897'
      }

    }
    
  }
)
 



function App() {
  const [loading,setLoading]=useState(false)
  const [resturantValue,setResturantValue]=useState('')
  const [nearByValue,setNearByValue]=useState('')
  const [allstarBucks,setAllStarBucks]=useState([])
  const [available,setAvailable]=useState(true)
  const [country,setCountry]=useState([])
  const handleResturantValueChange =e =>{
    setResturantValue(e.target.value)

  }
  const handleNearByValueChange =e =>{
    setNearByValue(e.target.value)

  }
  const handleSubmit =e=>{
    console.log("submitting",e)
    console.log("values that are goiong are ",resturantValue,nearByValue)
    axios.get("http://localhost:8585/findByCountry/"+nearByValue).then((response)=>{
      setAllStarBucks(response.data)
      setAvailable(false)
      setLoading(true)
      console.log("response",response.data)

    })

  }
const getAllCountry = ()=>{
  axios.get("http://localhost:8585/allCountry")
.then((response)=>{
  setCountry(response.data)
})
}
useEffect(()=>{
  getAllCountry()
},[])
  return (
    <div className='start' >
    <div className='appbar'>
      <ThemeProvider theme={theme}>
    <AppBar position="static">
      <Toolbar >
        <IconButton  edge ="start" href='/'>
          <MapIcon sx={{fontSize:40}} />
        </IconButton>
        <Typography noWrap component='a' href ="/"  sx={{
              color:'inherit',
              textDecoration: 'none',
              paddingRight:"120px"
            }}>DATA VIZIO</Typography>
            <Typography noWrap component='a' href ="/"  sx={{
              color:'inherit',
              textDecoration: 'none',
              paddingRight:'25px'
            }}>Starbucks</Typography>
            <Typography noWrap component='a' href ="/copy"  sx={{
              color:'inherit',
              textDecoration: 'none',
              paddingRight:'25px'
            }}>DATA VIZIO</Typography><Typography noWrap component='a' href ="/"  sx={{
              color:'inherit',
              textDecoration: 'none',
              flexGrow:1
            }}>DATA VIZIO</Typography>
        <Stack  spacing={2}>
          <Button color='inherit' href='https://github.com/0sha-dow0'>About me</Button>
          </Stack>     
      </Toolbar>
    </AppBar>
    </ThemeProvider>
    </div>
    <div>
      <Routes>
        
      </Routes>
    </div>
{/* 
    <div className='inputbox'>
      <Grid container spacing={2}>
        <Grid item xs={4}>
            <TextField disabled label="Resturant" variant='outlined' size='small' fullWidth select value={resturantValue} onChange={handleResturantValueChange}>
            {country.map((options)=>(
                <MenuItem key={options}
                 value={options}>{options}
                 </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={4}>
            <TextField label="Near" variant='outlined' size='small' fullWidth select value={nearByValue} onChange={handleNearByValueChange}>
              {country.map((options)=>(
                <MenuItem key={options}
                 value={options}>{options}
                 </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={4}>
             <Button variant="contained" startIcon={<SearchIcon/>} onClick={handleSubmit} color='secondary'>Search</Button>
            </Grid> 
        </Grid>
    </div> */}
    {/* <div className='mapContainer'>
{data && available &&<MapContainer center={[50, 50]} zoom={3} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {
    data.map(location =>(

      <Circle key = {location.ID} center={[location.Latitude,location.Longitude]} radius={1000} fillColor='green' color={location.Brand =="Subway"? "yellow":"green"} fillOpacity={'40%'}/>
  

      
    ))
  }
</MapContainer>}
{loading &&<MapContainer center={[0,0]} zoom={2} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {
    allstarBucks.map(location =>(
      
      <Marker key = {location.id} position={[location.lat,location.long]} zoom={13} >
        <Popup position={[location.lat,location.long]}>{"City:"+location.city_name}<br/>{"Resturant:"+location.Resturant}</Popup>
        
      </Marker>

      
    ))
  }
</MapContainer>}

</div> */}
</div>
  );
}

export default App;
