import { addHours, differenceInSeconds } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.all'
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');



export const CalendarModal = () => {

    const [formSubmited, setFormSubmited] = useState(false); 

    const {isDateModalOpen, closeDateModal} = useUiStore(); 
    const { activeEvent , startSavingEvent} = useCalendarStore(); 
    
    
    const [formValues, setFormValues] = useState({
        title: 'Brenda',
        notes: 'Morales',
        start: new Date(),
        end: addHours(new Date(), 2),

    });

   const titleClass =  useMemo(() => {
       if(!formSubmited)return ''; 

       return (formValues.title.length>0 )
       ?'is-valid'
       : 'is-invalid'

    }, [formValues.title, formSubmited])


    useEffect(() => {
        if( activeEvent !== null ){
            setFormValues({...activeEvent})
        }
    }, [activeEvent])
    



    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const oncloseModal = () => {
        closeDateModal(); 
    }

    const onDateChanged = (event, changin) => {
        setFormValues({
            ...formValues,
            [changin]: event
        })
    }

    const onSubmit = (event) => { 
        event.preventDefault();
        setFormSubmited(true); 

        const dif = differenceInSeconds(formValues.end, formValues.start)

        if (isNaN(dif) || dif <= 0) {
            Swal.fire('Fechas incorrectas','Favor de revisar las fechas', 'error')
            return ;
        }
        if (formValues.title.length <= 0)
        console.log(formValues);

        // TODO: 
         startSavingEvent( formValues );
        closeDateModal();
        setFormSubmited(false);

    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={oncloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}>


            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => onDateChanged(event, 'start')}
                        className='form-control'
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChanged(event, 'end')}
                        className='form-control'
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'

                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className= {`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}

                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
