'use strict'
const Message = use('App/Models/Message');
class MessageController {
    
    async messages({params,response}){
        try{
            const conversation_id =  params.conversation_id;
            const messages = await Message.query()
                                    .join('users','messages.user_id','users.id')
                                    .where('messages.conversation_id',conversation_id)
                                    .select(
                                        'users.username as user',
                                        'users.id as user_id',
                                        'messages.message',
                                        'messages.created_at'
                                    ).orderBy('messages.created_at','asc').fetch();
            return response.status(201).json({"data":messages});
        }catch(error){
            return response.status(500).json("error: "+error.message);
        }
    }
    async store({request,response}){
        try{
            const data = request.all();
            const message = await Message.create(data);
            return response.status(200).json({
                "data":message
            });
        }catch(error){
            return response.status(500).json("error: "+error.message);
        }
    }
}

module.exports = MessageController
