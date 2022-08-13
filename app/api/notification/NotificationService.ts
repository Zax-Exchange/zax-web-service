import { Activity, connect, DefaultGenerics, StreamClient, StreamFeed } from "getstream";
import sequelize from "../../postgres/dbconnection";
import { CreateProjectBidInput } from "../types/create/projectTypes";
import CompanyApiUtils from "../utils/companyUtils";
import ProjectApiUtils from "../utils/projectUtils";
import UserApiUtils from "../utils/userUtils";


class NotificationService {
  client?: StreamClient<DefaultGenerics>;

  constructor() {
    this.init();
  }

  init() {
    this.client = connect(process.env.STREAM_API_KEY!, process.env.STREAM_API_SECRET!, process.env.STREAM_APP_ID!, { location: 'us-east', timeout: 15000, browser: false });
  }
  
  createToken(userId: string) {
    if (!this.client) return;

    return this.client.createUserToken(userId);
  }

  async broadcastNewBid(data: CreateProjectBidInput) {
    if (!this.client) return;
    try {
      const users = await ProjectApiUtils.getProjectUsers(data.projectId);
      const companyId = await UserApiUtils.getUserCompanyId(data.userId);
      const companyName = await CompanyApiUtils.getCompanyWithCompanyId(companyId).then(c => c.name);
      const project = await ProjectApiUtils.getProject(data.projectId);
      const activityData = {
        'actor': data.userId, 
        'verb': 'bid', 
        foreign_id: project.id + companyId,
        group: project.id,
        'object': {
          projectId: project.id,
          projectName: project.name,
          companyName,
        }, 'time': new Date()
      } as any
      
      for (let user of users) {
        const feed = this.client.feed("notification", user.userId)
        feed.addActivity(activityData)
      }
    } catch (error) {
      console.error(error)
    }
    
  }
}

const notificationService = new NotificationService();

export default notificationService;