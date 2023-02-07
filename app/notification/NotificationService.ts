import http, { RequestOptions } from "http";

interface NotificationData {
  message: string;
  projectName?: string;
  vendorName?: string;
  customerName?: string;
  userName?: string;
  projectId?: string;
}
interface NotificationRequestBody {
  receivers: string[];
  data: NotificationData;
}

const port = process.env.NOTIFICATION_SERVICE_PORT;
const host = process.env.NOTIFICATION_SERVICE_HOST;

export default class NotificationService {
  static host = host;
  static port = port;

  static sendNotification(path: string, body: NotificationRequestBody) {
    var options: RequestOptions = {
      method: "POST",
      host: NotificationService.host,
      port: NotificationService.port,
      path,
      headers: {
        "Content-Type": "application/json",
      },
    };

    var req = http.request(options);
    req.write(JSON.stringify(body));
    req.end();
  }
}
