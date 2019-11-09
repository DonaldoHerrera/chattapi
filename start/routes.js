'use strict'
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});


Route.post('api/v1/auth/login','UserController.login');
Route.post('api/v1/auth/register','UserController.register');
Route.group(() =>{

  Route.get('users-online/:user_id_active','UserController.online');

  Route.get('conversations/:user_id_active','ConversationController.conversations');
  Route.post('conversations','ConversationController.store');

  Route.get('messages/:conversation_id','MessageController.messages');
  Route.post('messages/','MessageController.store');

  Route.post('auth/logout','UserController.logout');

}).prefix('api/v1').middleware('auth');
