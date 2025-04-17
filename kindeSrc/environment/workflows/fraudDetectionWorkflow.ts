import {
  createKindeAPI,
  denyAccess,
  onUserTokenGeneratedEvent,
  WorkflowSettings,
  getEnvironmentVariable,
  onPostAuthenticationEvent,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "postAUthentication",
  name: "Post-authentication",
  failurePolicy: {
    action: "stop",
  },
  trigger: "user:post_authentication",
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
    "kinde.fetch": {},
    "kinde.env": {},
    "kinde.auth": {},
    "kinde.idToken": {},
    "kinde.m2mToken": {},
    url: {},
  },
};

export default async function FraudDetectionWorkflow(
  event: onPostAuthenticationEvent
) {
  const kindeAPI = await createKindeAPI(event);
  const user = await getUserData(kindeAPI, event.context.user.id);

  const trustPathAPIKey = getEnvironmentVariable("TRUSTPATH_API_KEY")?.value;
  const isNewUser = event.context.auth.isNewUserRecordCreated;

  const eventType = isNewUser ? "account_register" : "account_login";

  const requestBody = {
    // Handles cases where multiple IPs are forwarded
    ip: event.request.ip.split(",")[0].trim(),
    email: user.preferred_email,
    user: {
      user_id: event.context.user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    event_type: eventType,
  };

  const response = await kinde.fetch(
    "https://api.trustpath.io/v1/risk/evaluate",
    {
      method: "POST",
      responseFormat: "json",
      headers: {
        Authorization: `Bearer ${trustPathAPIKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const state = response.json.data.score.state;
  if (state === "decline") {
    denyAccess(
      "You are not allowed to access this resource. Request declined by TrustPath"
    );
  }
}

async function getUserData(kindeAPI: any, userId: string) {
  const { data: user } = await kindeAPI.get({
    endpoint: `user?id=${userId}`,
  });
  return user;
}
