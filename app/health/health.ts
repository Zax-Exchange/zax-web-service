import { Request, Response } from "express"
import fetch from "node-fetch";


const notificationServiceHealthEndpoint = `${process.env.NOTIFICATION_SERVICE_HOST}:${process.env.NOTIFICATION_SERVICE_PORT}/api/health`;
const webappHomePage = `${process.env.FRONTEND_URL}/login`
const webstaticHomePage = `${process.env.WEBSTATIC_URL}`

const endpoints = [
  notificationServiceHealthEndpoint,
  webappHomePage,
  webstaticHomePage
]

const get503AfterTimeout = async (timeInMillis: number) => {
  await new Promise( resolve => setTimeout(resolve, timeInMillis) );
  return 504;   // gateway timeout
}

const getStatusCode = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint);
    return response.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
}

const fetchStatusOrTimeoutWithin10Seconds = async (endpoint: string) => {
  const statusCode = await Promise.race([
    getStatusCode(endpoint),
    get503AfterTimeout(10000)
  ]);
  return statusCode;
}

const health = async (req: Request, res: Response) => {
  res.status(200)
  res.send("OK")
}

const healthz = async (req: Request, res: Response) => {
  const responses = await Promise.all(endpoints.map(async (endpoint) => {
    const statusCode = await fetchStatusOrTimeoutWithin10Seconds(endpoint);
    return {
      endpoint,
      statusCode
    }
  }))
  const success = responses.every((response) => response.statusCode===200);
  const statusCode = success? 200 : 503   // 503 is Service Unavailable
  res.status(statusCode)
  res.send(responses)
}

export {
  healthz,
  health
}