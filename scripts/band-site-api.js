
class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    }

    // send a post request to the server and append to existing sata 

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

    //get comments from json, must sort the array from newest to oldest 

    async getComments() {
        try {
            const response = await axios.get(`${this.baseURL}comments?api_key=${this.apiKey}`);
            const comments = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            return comments;


        } catch (error) {
            console.error('Failed to retreive comments:', error);
            
        }



    };

    // must return the array of show data objects from the API 

    async getShows() {
        try {
            const shows = await axios.get(`${this.baseURL}showdates?api_key=${this.apiKey}`);
            return shows.data
            
        } catch(error) {
            console.error('Unable to retrieve show information:', error);
            
        }

    };
}


const API_KEY = "e72a5484-dff3-4315-ac2b-23edc696c942";
export default BandSiteApi;