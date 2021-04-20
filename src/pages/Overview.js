import React from 'react';
import { Calendar, Views } from 'react-big-calendar';
import events from '../../src/utils/events';
import moment from 'moment';
import * as dates from '../../src/utils/dates';
import { momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

const Basic = () => (
  <Calendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
    defaultDate={new Date(2015, 3, 1)}
    components={{
      timeSlotWrapper: ColoredDateCellWrapper,
    }}
    localizer={localizer}
  />
);

export default Basic;
