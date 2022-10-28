import http, { RequestOptions } from "http";

interface NotificationData {
  message: string;
  projectId?: string;
}
interface NotificationRequestBody {
  receivers: string[];
  data: NotificationData;
}

export default class NotificationService {
  static host = "localhost";
  static port = 8080;

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
