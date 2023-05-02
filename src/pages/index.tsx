import React, {useState, useEffect} from 'react';
import { BiSearchAlt, BiWind } from 'react-icons/bi';
import { WiHumidity } from 'react-icons/wi';
import { MdLocationPin } from 'react-icons/md';
import axios from 'axios';

function App() {

  const [city, setCity] = useState('');
  const [data, setData] = useState();
  const [erro, setErro] = useState(false);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=612df07eda2b7da996b1cff590604cb5&lang=pt_br`;


  async function fetchApi () {
    const info = await axios.get(apiUrl).then(i => {
      setData(i.data);
      setErro(false);
    }).catch(() => setErro(true));
  }

  function round(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchApi();
    }
  };

  function Weather(){

    if(data && !erro){

      const str = data?.weather[0].description.charAt(0).toUpperCase();
      const str2 = data?.weather[0].description.slice(1);

      return(
        <div className='mt-8 flex justify-center items-center'>
          <div className='flex justify-center items-center flex-col'>
            <div className='flex justify-between items-center gap-2'>
              <MdLocationPin size={25}/>
              <h2 className='font-black text-3xl'>
                {data?.name + ' -'}
              </h2>
              <img src={`https://flagsapi.com/${data?.sys.country}/flat/32.png`} alt="" />
            </div>
            <h3 className='font-semibold text-2xl mt-2'>
              {str + str2}
            </h3>
            <h1 className='mt-8 font-black text-6xl'>
              {round(data?.main.temp, 1).toFixed(1) + 'ºc'}
            </h1>
            <h3 className='mt-2 font-bold text-xl'>
              {data?.main.temp_max + '/' + data?.main.temp_min}
            </h3>
            <img 
              src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}.png`} 
              alt={`${data?.weather[0].description}`}
              className='mt-4 w-20'
            />
            <div className='flex justify-between items-center mt-4 gap-32'>
              <div className='flex flex-col justify-center items-center'>
                <WiHumidity size={45}/>
                <h3 className='text-xl font-semibold'>{data?.main.humidity + '%'}</h3>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <BiWind size={38}/>
                <h3 className='text-xl font-semibold'>{data?.wind.speed + 'm/s'}</h3>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return;
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
      <div>
        <h1 className='text-sky-50 font-black text-4xl mb-10 mare'>
          Weather App
        </h1>
      </div>
      <div className='bg-zinc-900 p-10 rounded shadow-2xl max-sm:w-5/6 text-sky-50'>
        <div className='flex items-center justify-center'>
          <input 
            type="text
            " 
            placeholder='Insira o nome da localização'
            className='p-4 w-64 text-zinc-900'
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className='hover:cursor-pointer' onClick={() => fetchApi()}>
            <BiSearchAlt
              size={30}
              className='ml-6 transition-all hover:scale-125'
            />
          </button>
        </div>
        <Weather/>
        <div className={`flex justify-center items-center bg-red-500 mt-8 p-2 rounded shadow-xl text-center ${erro ? '' : 'hidden'}`}>
          <h2 className='font-semibold'>Informe uma localização valida.</h2>
        </div>
      </div>
    </div>
  );
}

export default App;