const API_KEY = "e72a5484-dff3-4315-ac2b-23edc696c942";

class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    }

    // send a post request to the server and append to existing sata 

    async postComment(newComment) {
        try {
            result = axios.post(`${this.baseURL}/comments?api_key=<${this.apiKey}>`);
            
            console.log(result)
            return result.data

            


        } catch {
            console.error('Unable to post comment:', error);
            
        }

    };

    //get comments from json, must sort the array from newest to oldest 

    async getComments() {
        try {
            const comments = await axios.get(`${this.baseURL}/comments?api_key=<${this.apiKey}>`);
            console.log(comments.data);

            return comments.data


        } catch (error) {
            console.error('Failed to retreive comments:', error);
            
        }



    };

    // must return the array of show data objects trturned from the API 

    async getShows() {
        try {
            const shows = await axios.get(`${this.baseURL}/comments?api_key=<${this.apiKey}>`);
            
            console.log(shows.data);
            return shows.data


        } catch {
            console.error('Unable to retrieve show information:', error);
            
        }

    };
}



export default BandSiteApi;