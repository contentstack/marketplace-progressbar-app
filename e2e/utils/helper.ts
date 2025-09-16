import axios from "axios";
import jsonfile from "jsonfile";

const file = "data.json";

const savedObj = {};
const {
  BASE_API_URL,
  EMAIL,
  PASSWORD,
  DEVELOPER_HUB_API,
  ORG_ID,
  APP_HOST_URL,
  STACK_API_KEY,
} = process.env;

// entry page access
export const entryPageFlow = async (savedCredentials, entryPage) => {
  // navigate to stacks page
  const { STACK_API_KEY } = process.env;
  const { contentTypeId, entryUid } = savedCredentials;
  await entryPage.navigateToEntry(STACK_API_KEY, contentTypeId, entryUid);
};

const writeFile = async (obj: any) => {
  jsonfile
    .writeFile(file, obj)
    .then((res) => res)
    .catch((error) => console.error(error));
};

// get authtoken
export const getAuthToken = async (): Promise<string> => {
  const options = {
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
    const result = await axios(options);
    savedObj.authToken = result.data.user.authtoken;
    await writeFile(savedObj);
    return result.data.user.authtoken;
  } catch (error) {
    return error;
  }
};

// create app in developer hub
export const createApp = async (authToken: string) => {
  const options = {
    url: `https://${DEVELOPER_HUB_API}/apps`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
    data: {
      name: `Progress Bar ${Math.floor(Math.random() * 1000)}`,
      target_type: "stack",
    },
  };
  try {
    const result = await axios(options);
    return result.data.data.uid;
  } catch (error) {
    return error;
  }
};

// updating app in developer hub & set baseUrl
export const updateApp = async (authToken: string, appId: string) => {
  const appName = `Progress bar _${Math.floor(Math.random() * 1000)}`;
  const options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${appId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
    data: {
      ui_location: {
        locations: [
          {
            type: "cs.cm.stack.custom_field",
            meta: [
              {
                name: appName,
                path: "/custom-field",
                signed: false,
                enabled: true,
                data_type: "json",
              },
            ],
          },
        ],
        signed: true,
        base_url: APP_HOST_URL,
      },
    },
  };
  try {
    const result = await axios(options);
    return { data: result.data, name: appName };
  } catch (error) {
    return error;
  }
};

// get installed app
export const getInstalledApp = async (authToken: string, appId: string) => {
  const options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${appId}/installations`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// install app in stack & return installation id
export const installApp = async (
  authToken: string,
  appId: string,
  stackApiKey: string | undefined
) => {
  const options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${appId}/install`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
    data: {
      target_type: "stack",
      target_uid: stackApiKey,
    },
  };
  try {
    const result = await axios(options);
    return result.data.data.installation_uid;
  } catch (error) {
    return error;
  }
};

// create environment
export const createEnv = async (authToken: string) => {
  const options = {
    url: `https://${BASE_API_URL}/v3/environments`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      api_key: STACK_API_KEY,
      authtoken: authToken,
    },
    data: {
      environment: {
        name: "development",
      },
    },
  };
  try {
    const response = await axios(options);
    return response.data.environment.name;
  } catch (error) {
    return error;
  }
};

// deleting environment
export const deleteEnv = async (authToken: string, envName: string) => {
  const options = {
    url: `https://${BASE_API_URL}/v3/environments/${envName}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      api_key: STACK_API_KEY,
      authtoken: authToken,
    },
  };
  try {
    await axios(options);
  } catch (error) {
    return error;
  }
};

// uninstall app from the stack
export const uninstallApp = async (authToken: string, installId: string) => {
  const options = {
    url: `https://${DEVELOPER_HUB_API}/installations/${installId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: authToken,
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// deletes the created test app during tear down
export const deleteApp = async (token, appId) => {
  const options = {
    url: `https://${DEVELOPER_HUB_API}/apps/${appId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      organization_uid: ORG_ID,
      authtoken: token,
    },
  };
  try {
    await axios(options);
  } catch (error) {
    return error;
  }
};

// get list of apps/extension IDs
export const getExtensionFieldUid = async (
  authToken: string,
  stackApiKey: string | undefined
): Promise<string> => {
  const options = {
    url: `https://${BASE_API_URL}/v3/extensions?include_marketplace_extensions=true`,
    method: "GET",
    headers: {
      api_key: stackApiKey,
      authtoken: authToken,
      "Content-type": "application/json",
      organization_uid: ORG_ID,
    },
  };
  try {
    const result = await axios(options);
    return result.data.extensions[0].uid;
  } catch (error) {
    return error;
  }
};

// create content-type
export const createContentType = async (
  authToken: string,
  stackApiKey: string | undefined,
  extensionId: string
) => {
  const generateUid = `Test Content Type_${Math.floor(Math.random() * 1000)}`;
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
  const options = {
    url: `https://${BASE_API_URL}/v3/content_types`,
    method: "POST",
    headers: {
      api_key: stackApiKey,
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
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// create entry
export const createEntry = async (
  authToken: string,
  contentTypeId: string,
  stackApiKey: string | undefined
) => {
  const generateTitle = `Test Entry ${Math.floor(Math.random() * 1000)}`;
  const options = {
    url: `https://${BASE_API_URL}/v3/content_types/${contentTypeId}/entries`,
    params: { locale: "en-us" },
    method: "POST",
    headers: {
      api_key: stackApiKey,
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
    const result = await axios(options);
    return result.data.entry.uid;
  } catch (error) {
    return error;
  }
};

// deletes the created content type during tear down
export const deleteContentType = async (token, contentTypeId) => {
  const options = {
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
