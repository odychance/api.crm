import { useEffect, useState }from 'react'
import { useParams} from 'react-router-dom';
import Formulario from '../componentes/Formulario';
import { backendapi } from '../constants';


const EditarCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)
  const {id} = useParams()


  useEffect( () => {
      const obtenerClienteAPI = async () => {
          try {
              const url= `${import.meta.env.VITE_API_URL}/${id}`
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()
              setCliente(resultado)
          } catch (error) {
              console.log(error)
          }
              setCargando(!cargando) 
      }
      obtenerClienteAPI()

  }, [])

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900 hover:text-blue-800 transition-all'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza este formulario para editar el cliente</p>


        {cliente?.nombre ? (
              <Formulario 
              cliente={cliente}
              cargando={cargando}
            />
        
        ): <p>Cliente ID no valido.</p>}
    </>
    )
};

export default EditarCliente;
