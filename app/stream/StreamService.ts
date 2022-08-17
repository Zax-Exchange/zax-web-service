import { Activity, connect, DefaultGenerics, StreamClient, StreamFeed } from "getstream";
import sequelize from "../postgres/dbconnection";
import { CreateProjectBidInput } from "../api/types/create/projectTypes";
import CompanyApiUtils from "../api/utils/companyUtils";
import ProjectApiUtils from "../api/utils/projectUtils";
import UserApiUtils from "../api/utils/userUtils";


class StreamService {
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
        'verb': `bid for ${project.id}`, 
        foreign_id: project.id + companyId,
        'object': {
          projectId: project.id,
          projectName: project.name,
          companyName,
        }, 
        'time': new Date()
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

const streamService = new StreamService();

export default streamService;