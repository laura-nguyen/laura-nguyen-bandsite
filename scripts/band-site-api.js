class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    }

    async postComment(newComment) {
        try {
            const response = await axios.post(`${this.baseURL}comments?api_key=${this.apiKey}`, newComment, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            return response.data;

        } catch(error) {
            console.error('Unable to post comment:', error);
        }

    };

    async getComments() {
        try {
            const response = await axios.get(`${this.baseURL}comments?api_key=${this.apiKey}`);
            const comments = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            return comments;

        } catch (error) {
            console.error('Failed to retreive comments:', error);
        }
    };

    async getShows() {
        try {
            const shows = await axios.get(`${this.baseURL}showdates?api_key=${this.apiKey}`);
            return shows.data
            
        } catch(error) {
            console.error('Unable to retrieve show information:', error);
        }
    };
}

export default BandSiteApi;