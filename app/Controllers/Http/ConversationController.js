'use strict'

const Conversation = use('App/Models/Conversation');

class ConversationController {
    async conversations({params,response}){
        try{
            const conversations = await Conversation.query()
                                .where('user_one',params.user_id_active)
                                .orWhere('user_two',params.user_id_active)
                                .join('users as user_one','conversations.user_one','user_one.id')
                                .join('users as user_two','conversations.user_two','user_two.id')
                                .select(
                                    'user_one.username as usernameone',
                                    'user_two.username as usernametwo',
                                    'user_one.id as id_one',
                                    'user_two.id as id_two',
                                    'user_one.status as statusone',
                                    'user_two.status as statustwo',
                                    'conversations.id as conversation_id'
                                ).fetch();
            return response.status(201).json(
                {
                    "data":conversations
                }
            );
        }catch(error){
            return response.status(500).json("error: "+error.message);
        }
    }

    async store({request,response}){
        try{
            const data = request.all(); 
            const conversation = await Conversation.create(data);
            return response.status(200).json(conversation);
        }catch(error) {
            return response.status(500).json("error: "+error.message);
        }
    }
}

module.exports = ConversationController
