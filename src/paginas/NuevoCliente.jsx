import Formulario from '../componentes/Formulario';

const NuevoCliente = () => {
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900 hover:text-blue-800 transition-all'>Nuevo Cliente</h1>
        <p className='mt-3'>Llena los siguientes campos para registrar un cliente</p>

        <Formulario />
    </>
    )
};

export default NuevoCliente;
