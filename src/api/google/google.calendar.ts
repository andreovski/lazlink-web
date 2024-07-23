import { googleCalendarApi } from "@/lib/axios";

export const getGoogleCalendarEventsByDay = async ({
  orderBy,
  singleEvents,
  timeMax,
  timeMin,
}: IGetGoogleCalendarEventsByDayQueryParams) => {
  try {
    const response = await googleCalendarApi.get<IGoogleCalendarEventResponse>(
      "/primary/events",
      {
        params: {
          orderBy,
          singleEvents,
          timeMax,
          timeMin,
        },
      },
    );

    return response.data;
  } catch {
    throw new Error("Error fetching user google calendar event by day");
  }
};
