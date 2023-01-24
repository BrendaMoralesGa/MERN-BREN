import {  parse, startOfWeek, getDay, format } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import { dateFnsLocalizer } from 'react-big-calendar'


const locales = {
    'es': enUS,
  }
  
  export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  }); 

  