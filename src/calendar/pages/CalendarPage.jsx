
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns'
import { getMessgesES, localizer } from '../../helpers';
import { Navbar } from '../components/Navbar';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';



//const events = [];

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const { openDateModal } = useUiStore();  
  const { events, setActiveEvent } = useCalendarStore();



  const evenStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }
  }

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = ( event ) => {
     console.log({ click: event });
    setActiveEvent( event );
  }
  const onViewChanged = (event) => {
    console.log('onViewChanged')
    localStorage.setItem('lastView', event);

  }





  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessgesES()}
        eventPropGetter={evenStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew/>
      <FabDelete/>
        </>
  )
}
