
var ApiService = {
    baseUrl: 'http://localhost:8080/api',

    async __PostRequest(link, data, success, failure){
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:8080' },
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


    async __PutRequest(link, data, success, failure){
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:8080' },
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

    async __DeleteRequestId(link, id, success, failure){
        var deleteLink = link + '/' + parseInt(id);
        const request = {
            method: 'DELETE'
        }
        fetch(deleteLink, request)
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

    async __DeleteRequest(link, success, failure){
        const request = {
            method: 'DELETE',
            headers: { 'Origin': 'http://localhost:8080' }
        }

        fetch(link, request)
            .then(async response => {
                const data = await response.json();
                if (!response.ok){
                    failure(data || response.status);

            }else{
                success(data);
            }
        }, async rejected => {
            failure(rejected);
        });
    },

    async LogInUser(data, success, failure){
        console.log('Request:');
        console.log(data);
        fetch(this.baseUrl+'/participant')
            .then(response => response.json())
            .then(users => {
                if (!users.participants) failure();
                return users;
            })
            .then(users => users.participants)
            .then(users => {
                var user = null;
                for(var i=0; i<users.length; i++){
                    if (data.password !== users[i].password) continue;
                    if (data.username && data.username !== users[i].userName) continue;
                    if (data.email && data.email !== users[i].email) continue;
                    user = users[i];
                }
                if (user !== null) success(user);
                    
                else failure('Invalid credentials!');
            });
            
    },

    async RegisterUser(data, success, failure){
        this.__PostRequest(this.baseUrl + '/participant', data, success, failure);
    },

    async ResetUserPassword(data, success, failure){
        setTimeout(() => {
            success({message: 'Check your email: ' + data.email});
        }, 2500);
    },

    async GetUserData(id, success, failure){
        fetch(this.baseUrl + '/participant/' + id)
            .then(response => response.json())
            .then(data => {
                if (!data.participants || data.participants.length == 0) failure('No user!');
                else success(data.participants[0]);
            });
    },

    async CreateConference(data, success, failure){
        this.__PostRequest(this.baseUrl + '/conference', data, success, failure);
    },

    async GetAllConferences(success, failure){
        fetch(this.baseUrl + '/conference')
            .then(response => response.json())
            .then(data => {
                if (!data.conferences) failure();
                else success(data.conferences);
            });
    },

    async GetConferenceDetails(id, success, failure){
        fetch(this.baseUrl + '/conference/' + id)
            .then(response => response.json())
            .then(data => {
                if (!data.conferences || data.conferences.length == 0) failure("No such conference!");
                else success(data.conferences[0]);
            });
    },

    async CreateRoom(data, success, failure){
        this.__PostRequest(this.baseUrl + '/room', data, success, failure);
    },

    async DeleteRoom(id, success, failure){
        this.__DeleteRequestId(this.baseUrl + '/room', id, success, failure);
    },

    async UpdateRoom(data, success, failure){
        this.__PutRequest(this.baseUrl + '/room/update', data, success, failure);
    },


    async GetAllRooms(success, failure){
        fetch(this.baseUrl + '/room')
            .then(response => response.json())
            .then(data => {
                if (!data.rooms) failure();
                else success(data.rooms);
            });
    },

    async GetAllConferenceSections(conferenceId, success, failure){
        fetch(this.baseUrl + '/conference_section/')
            .then(response => response.json())
            .then(data => data.conferenceSections)
            .then(data => {
                let res = [];
                for (var i = 0; i < data.length; i ++){
                    if (data[i].conferenceId == conferenceId) res.push(data[i]);
                }
                success(res);
            });
    },

    async CreateConferenceSection(data, success, failure){
        console.log(data);
        this.__PostRequest(this.baseUrl + '/conference_section', data, success, failure);
    },

    async DeleteConfereceSection(id, success, failure){
        this.__DeleteRequest(this.baseUrl + '/conference_section/' + id, success, failure);
    },

    async GetPossibleUsersForChair(data, success, failure){
        fetch(this.baseUrl + '/participant')
            .then(response => response.json())
            .then(data => success(data.participants));
    },

    async GetParticipantNameById(id, success, failure){
        fetch(this.baseUrl + '/participant/' + id)
            .then(response => response.json())
            .then(data => data.participants)
            .then(data => {
                if (data.length == 0) failure();
                else success(data[0].name);
            })
    },

    async GetAllProposals(success, failure){
        fetch(this.baseUrl + '/proposal')
            .then(response => response.json())
            .then(data => {
                if (!data.proposals) failure();
                else success(data.proposals);
            });
    },

    async GetProposalDetails(id, success, failure){
        fetch(this.baseUrl + '/proposal/' + id)
            .then(response => response.json())
            .then(data => {
                if (!data.proposals || data.proposals.length == 0) failure("No such proposal!");
                else success(data.conferences[0]);
            });
    },

    async CreateProposal(data, success, failure){
        console.log(data);
        this.__PostRequest(this.baseUrl + '/proposal', data, success, failure);
    },

    async UpdateProposal(data, success, failure){
        console.log(data);
        this.__PutRequest(this.baseUrl + '/proposal', data, success, failure);
    },

    async GetAllReviews(success, failure){
        fetch(this.baseUrl + '/review')
            .then(response => response.json())
            .then(data => {
                if (!data.reviews) failure();
                else success(data.reviews);
            });
    },

      async GetAllParticipants(success, failure){
        fetch(this.baseUrl + '/participant')
            .then(response => response.json())
            .then(data => data.participants)
            .then(data => { success(data); })
    },

    async GetAllChairs(success, failure){
        fetch(this.baseUrl + '/chair')
            .then(response => response.json())
            .then(data => data.chairs)
            .then(data => { success(data); })
    },

    async GetAllReviewers(success, failure){
        fetch(this.baseUrl + '/reviewer')
            .then(response => response.json())
            .then(data => data.reviewers)
            .then(data => { success(data); })
    },

    async GetAllCoChairs(success, failure){
        fetch(this.baseUrl + '/cochair')
            .then(response => response.json())
            .then(data => data.coChairs)
            .then(data => { success(data); })
    },

    async AddChair(participantId, success, failure){
        this.__PostRequest(this.baseUrl+'/chair', {participantId: participantId}, success, failure);
    },

    async AddCoChair(participantId, success, failure){
        console.log({participantId: participantId});
        this.__PostRequest(this.baseUrl+'/cochair', {participantId: participantId}, success, failure);
    },

    async AddReviewer(participantId, success, failure){
        console.log({participantId: participantId});
        this.__PostRequest(this.baseUrl+'/reviewer', {participantId: participantId}, success, failure);
    },

    async CreateReview(data, success, failure){
        console.log(data);
        this.__PostRequest(this.baseUrl + '/review', data, success, failure);
    },

    async GetQualifierDetails(id, success, failure){
        fetch(this.baseUrl + '/qualifier/' + id)
            .then(response => response.json())
            .then(data => {
                if (!data.qualifiers || data.qualifiers.length == 0) failure("No such qualifier!");
                else success(data.qualifiers[0]);
            });
    }

}

export default ApiService;
