import axios from "axios";
import jsonfile from "jsonfile";

const { ORG_ID, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD, BASE_API_URL }: any =
  process.env;

const file = "data.json";
const savedObj: any = {};

const writeFile = async (obj: any) => {
  jsonfile
    .writeFile(file, obj)
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => console.error(error));
};

export const getAuthToken = async () => {
  let options = {
    url: `https://${BASE_API_URL}/v3/user-session`,
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      user: {
        email: BASIC_AUTH_USERNAME,
        password: BASIC_AUTH_PASSWORD,
      },
    },
  };
  try {
    let result = await axios(options);
    savedObj["authToken"] = result.data.user.authtoken;
    await writeFile(savedObj);
    return result.data.user.authtoken;
  } catch (error) {
    console.log('error: ', error)
    console.error(error);
  }
};

export const createStack = async (authToken: string, stackName: string) => {
  let options = {
    url: `https://${BASE_API_URL}/v3/stacks`,
    method: "POST",
    headers: {
      authtoken: authToken,
      organization_uid: ORG_ID,
      "Content-type": "application/json",
    },
    data: {
      stack: {
        name: stackName,
        description: "",
        master_locale: "en-us",
      },
    },
  };
  try {
    let result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};
