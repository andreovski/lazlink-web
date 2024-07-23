interface IGetGoogleCalendarEventsByDayQueryParams {
  timeMin?: Date;
  timeMax?: Date;
  singleEvents?: boolean;
  orderBy?: "startTime" | "updated";
}

interface IGetGoogleCalendarEventsByDayPathParams {
  calendarId: string | "primary";
}

interface CalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: {
    email: string;
    self: boolean;
  };
  organizer: {
    email: string;
    self: boolean;
  };
  start: {
    date: string;
  };
  end: {
    date: string;
  };
  transparency: string;
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
}

interface IGoogleCalendarEventResponse {
  items: CalendarEvent[];
}
