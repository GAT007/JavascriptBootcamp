class Github {
    constructor() {
        this.client_id = "01036e00619e7ff805db";
        this.client_secret = "6520a97c080f3741359d13fe19ca536d7b757915";
        this.repos_count = 10;
        this.repos_sort = "created: asc";
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profileData = await profileResponse.json();
        const repoData = await repoResponse.json();
        return {
            profile : profileData,
            repos : repoData
        }
    } 
}