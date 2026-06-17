export class UserService {
  async getUserProfile(userId: number) {
    console.log('Getting profile for user', userId)
  }
  
  async updateUserProfile(userId: number, updates: any) {
    console.log('Updating profile for user', userId, updates)
  }
  
  async getLeaderboard(limit: number = 100) {
    console.log('Getting leaderboard')
  }
}

export const userService = new UserService()
