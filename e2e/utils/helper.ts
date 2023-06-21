import axios from "axios";
import jsonfile from "jsonfile";

const {
  ORG_ID,
  EMAIL,
  PASSWORD,
  BASE_API_URL,
  STACK_API_KEY,
  DEVELOPER_HUB_API,
  REACT_APP_UID,
  REACT_UID,
}: any = process.env;

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
        email: EMAIL,
        password: PASSWORD,
      },
    },
  };
  try {
    let result = await axios(options);
    savedObj["authToken"] = result.data.user.authtoken;
    await writeFile(savedObj);
    return result.data.user.authtoken;
  } catch (error) {
    console.error(error);
  }
};

export const installApp = async (authToken: string) => {
  let options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${REACT_APP_UID}/install`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
    data: {
      target_type: "stack",
      target_uid: STACK_API_KEY,
    },
  };
  try {
    let result = await axios(options);
    savedObj["installation_uid"] = result.data.data.installation_uid;
    console.log("install app response******: ", result);
    // return result.data.data.installation_uid;
  } catch (error) {
    return error;
  }
};

export const uninstallApp = async (authToken: string, installId: string) => {
  let options = {
    url: `https://${DEVELOPER_HUB_API}/installations/${installId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
  };
  try {
    let result = await axios(options);
    console.log("uninstall app response******: ", result);
    // return result.data;
  } catch (error) {
    return error;
  }
};

export const createContentType = async (authToken: string) => {
  const generateUid = 'Test Content Type';
  const schemaData = [
    {
      display_name: "Title",
      uid: "title",
      data_type: "text",
      field_metadata: {
        _default: true,
      },
      unique: false,
      mandatory: true,
      multiple: false,
    },
    {
      config: {},
      display_name: "Custom",
      extension_uid: "blt9d86cf0ab4d85f60",
      field_metadata: { extension: true },
      mandatory: false,
      non_localizable: false,
      uid: "custom",
      unique: false,
    },
  ];
  let options = {
    url: `https://${BASE_API_URL}/v3/content_types`,
    method: "POST",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: authToken,
      "Content-type": "application/json",
    },
    data: {
      content_type: {
        title: generateUid,
        uid: generateUid.replace(/\s/g, "_").toLowerCase(),
        schema: schemaData,
      },
    },
  };
  try {
    let result = await axios(options);
    console.log("content type response *******: ", result);
    return result.data.content_type.uid;
  } catch (error) {
    return error;
  }
};

export const createEntry = async (authToken: string, contentTypeId: string) => {
  let generateTitle = 'Test Entry';
  let options = {
    url: `https://${BASE_API_URL}/v3/content_types/${contentTypeId}/entries`,
    params: { locale: "en-us" },
    method: "POST",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: authToken,
      "Content-type": "application/json",
    },
    data: {
      entry: {
        title: generateTitle,
        url: "test-entry",
      },
    },
  };
  try {
    let result = await axios(options);
    console.log("entry response *******: ", result);
    return result.data;
  } catch (error) {
    return error;
  }
};
