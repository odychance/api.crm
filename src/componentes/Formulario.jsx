import React from 'react';
import { Formik, Form, Field} from 'formik'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta';
import Spinner from './Spinner';
import { backendapi } from '../constants';

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(2, 'El Nombre es Muy Corto')
                    .max(25, 'El Nombre es Muy Largo')
                    .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .required('el email es obligatorio')
                    .email('Email invalido'),
        telefono: Yup.number()
                    .integer('El numero no puede llevar decimales')
                    .positive('El numero no puede ser negativo')
                    .typeError('Numero no valido'),
        notas: ''
    })
    
    const handleSubmit = async (valores) => {

        try {
            let respuesta
            if(cliente.id) {
                //Editando un registro
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            } else {
                //Nuevo regisro
                const url = import.meta.env.VITE_API_URL

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
            await respuesta.json()

            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }

    }

  return (
      cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

            <h1 className='text-gray-600 uppercase text-center font-bold text-xl hover:text-gray-500 transition-all'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? '',
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)

                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {
                    return (
                <Form>
                <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='nombre'
                        >Nombre: </label>
                        <Field
                            id='nombre'
                            type="Text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del Cliente"
                            name="nombre"
                        />
                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='empresa'
                        >Empresa: </label>
                        <Field
                            id='empresa'
                            type="Text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Empresa del Cliente"
                            name="empresa"
                        />
                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ) : null}

                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='email'
                        >E-mail: </label>
                        <Field
                            id='email'
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Email del Cliente"
                            name="email"
                        />
                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ) : null}

                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='telefono'
                        >Telefono: </label>
                        <Field
                            id='telefono'
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Telefono del Cliente"
                            name="telefono"
                        />
                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ) : null}

                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='notas'
                        >Notas: </label>
                        <Field
                            as="textarea"
                            id='notas'
                            type="Text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Notas del Cliente"
                            name="notas"
                        />
                    </div>
                    <input
                        type="submit"
                        value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-md hover:bg-blue-900 transition-all'
                    />
                </Form>
                )}}
            </Formik>
        </div>
      )
    )
};

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario;
