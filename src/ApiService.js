
var ApiService = {
    baseUrl: 'http://localhost:8080/api',

    async __PostRequest(link, data, success, failure){
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        fetch(link, request)
            .then(async response => {
                const data = await response.json();
                if (!response.ok){
                    const error = data || response.status; // || data.message || data.error - TBD          
                    failure(error);
                }else{
                    success(data);
                }
            }, async rejected => {
                failure(rejected);
            });
    },

    async LogInUser(data, success, failure){
        // There must be an end-point to specifically verify the identity of a participant
        
        // placeholder

        setTimeout(() =>{
            console.log(data);
            if (data.username === 'admin' && data.password === 'admin'){
                success({message: 'OK', username: 'admin'});
            }else{
                failure({error: 'Invalid credentials!'});
            }
        }, 2500);
            
    },

    async RegisterUser(data, success, failure){
        this.__PostRequest(this.baseUrl + '/participant', data, success, failure);
    },

    async ResetUserPassword(data, success, failure){
        setTimeout(() => {
            success({message: 'Check your email: ' + data.email});
        }, 2500);
    }
}

export default ApiService;