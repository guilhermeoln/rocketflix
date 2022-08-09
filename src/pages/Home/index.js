import './home.css';
import api from '../../services/api';
import { useState } from 'react';
import Logo from './logo.png'


function Home(){

    const [titulo, setTitulo] = useState('');
    const [img, setImg] = useState('');
    const [sobre, setSobre] = useState('');

    async function buscarFilmes(){

        let random = (Math.floor(Math.random() * 500 + 1))

        await api.get(`/movie/${random}`, {
            params:{
              api_key: "38fc80aaee6d81bcdb7d91f2d424443e",
              language: 'pt-BR'
            }
          }).then((response) =>{
            setTitulo(response.data.title)
            setImg(response.data.poster_path)
            setSobre(response.data.overview)
          }).catch(() => {
            random = (Math.floor(Math.random() * 500 + 1))
        })
    }





    return(
        <div className="container-home">
          <img src={Logo} alt='logo' className='logo'/>
            <h1>Não sabe o que assistir?</h1>
            {titulo.length > 0 ? 
            <div>
                <h2>{titulo}</h2>
                <div className='content-filmes'>
                  <img src={`https://image.tmdb.org/t/p/original/${img}`} alt={titulo}/>
                  {sobre.length > 0 
                    ?
                    <p>{sobre}</p>
                    :
                    <p>Não possui descrição</p>
                  }
                </div>
            </div> 
            : 
            ''}
            <button onClick={ buscarFilmes }>Encontrar Filme</button>
        </div>
    );
}


export default Home;