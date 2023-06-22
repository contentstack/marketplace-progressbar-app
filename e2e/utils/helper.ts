import axios from "axios";
import jsonfile from "jsonfile";

const {
  ORG_ID,
  EMAIL,
  PASSWORD,
  BASE_API_URL,
  STACK_API_KEY,
  DEVELOPER_HUB_API,
  REACT_ID,
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
    url: `https://${DEVELOPER_HUB_API}/apps/${REACT_ID}/install`,
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
    return result.data.data.installation_uid;
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
    await axios(options);
  } catch (error) {
    return error;
  }
};

const createContentType = async (authToken: string, extensionId: string) => {
  const generateUid = "Test Content Type";
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
      extension_uid: extensionId,
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
    const uid = result.data.content_type.uid;
    savedObj["contentTypeUid"] = uid;
    await writeFile(savedObj);
    createEntry(authToken, uid);
  } catch (error) {
    return error;
  }
};

const createEntry = async (authToken: string, contentTypeId: string) => {
  let generateTitle = "Test Entry";
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
    savedObj["entryId"] = result.data.entry.uid;
    await writeFile(savedObj);
  } catch (error) {
    return error;
  }
};

export const deleteEntry = async (
  token: string,
  contentTypeId: string,
  entryId: string
) => {
  let options = {
    url: `https://${BASE_API_URL}/v3/content_types/${contentTypeId}/entries/${entryId}`,
    method: "DELETE",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: token,
      "Content-type": "application/json",
    },
  };
  try {
    await axios(options);
  } catch (error) {
    return error;
  }
};

export const deleteContentType = async (
  token: string,
  contentTypeId: string
) => {
  let options = {
    url: `https://${BASE_API_URL}/v3/content_types/${contentTypeId}`,
    method: "DELETE",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: token,
      "Content-type": "application/json",
    },
  };
  try {
    await axios(options);
  } catch (error) {
    return error;
  }
};

const getExtensions = async (token: string) => {
  let options = {
    url: `https://${BASE_API_URL}/v3/extensions?include_marketplace_extensions=true`,
    method: "GET",
    headers: {
      api_key: STACK_API_KEY,
      authtoken: token,
      "Content-type": "application/json",
      organization_uid: ORG_ID,
    },
  };
  try {
    let result = await axios(options);
    createContentType(token, result.data.extensions[0].uid);
  } catch (error) {
    console.error(error);
  }
};

export const createContentTypeAndEntry = async (token: string) => {
  getExtensions(token);
};
