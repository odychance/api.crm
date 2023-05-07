import { useEffect, useState }from 'react'
import { useParams} from 'react-router-dom';
import Spinner from '../componentes/Spinner';

const VerCliente = () => {

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
        cargando ? <Spinner /> : 
                Object.keys(cliente).length === 0 ?
                <p className='font-bold uppercase text-gray-800 text-center text-2xl'>
                    No hay resultados
                </p> : (
            
                    <>
                        <div>
                            <h1 className='font-black text-4xl text-blue-900 hover:text-blue-800 transition-all'>Ver Cliente: {cliente.nombre}</h1>
                            <p className='mt-3'>Información del cliente.</p>
                        </div>

                        <div className='bg-#fff border rounded-xl mt-10 p-5 shadow-lg'>

                            {cliente.nombre && (
                                <p className='text-gray-600 text-4xl '>
                                <span className='text-gray-800 uppercase font-bold '>Cliete: </span> 
                                    {cliente.nombre}
                                </p>    
                            
                            )}

                            {cliente.email && (
                                <p className='text-gray-600 text-2xl mt-4'>
                                <span className='text-gray-800 uppercase font-bold '>Email: </span> 
                                    {cliente.email}
                                </p>    
                            
                            )}
                            {cliente.telefono && (
                                <p className='text-gray-600 text-2xl mt-4'>
                                <span className='text-gray-800 uppercase font-bold '>Teléfono: </span> 
                                    {cliente.telefono}
                                </p>    
                            
                            )}
                            {cliente.empresa && (
                                <p className='text-gray-600 text-2xl mt-4'>
                                <span className='text-gray-800 uppercase font-bold '>Empresa: </span> 
                                    {cliente.empresa}
                                </p>    
                            
                            )}
                            {cliente.nombre && (
                                <p className='text-gray-600 text-2xl mt-4'>
                                <span className='text-gray-800 uppercase font-bold '>Nota(s): </span> 
                                    {cliente.notas}
                                </p>    
                            
                            )}
                        </div>
                    </>
            )
    )

};

export default VerCliente;
