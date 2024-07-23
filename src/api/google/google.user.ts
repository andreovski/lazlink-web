/* eslint-disable camelcase */
import axios from "axios";

export type GoogleUserDataResponse = {
  email: string;
  name: string | null;
  photo: string | null;
};

export const getUserInformation = async (google_access_token: string) => {
  try {
    const { data } = await axios.get(
      "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos",
      {
        headers: {
          Authorization: `Bearer ${google_access_token}`,
        },
      },
    );

    const response: GoogleUserDataResponse = {
      email: data.emailAddresses?.[0]?.value,
      name: data.names?.[0].displayName,
      photo: data.photos?.[0]?.url,
    };

    return response;
  } catch {
    throw new Error("Error fetching user google data");
  }
};
