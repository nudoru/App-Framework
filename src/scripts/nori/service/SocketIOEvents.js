/* @flow weak */

export default {
  PING               : 'ping',
  PONG               : 'pong',
  NOTIFY_CLIENT      : 'notify_client',
  NOTIFY_SERVER      : 'notify_server',
  CONNECT            : 'connect',
  DROPPED            : 'dropped',
  USER_CONNECTED     : 'user_connected',
  USER_DISCONNECTED  : 'user_disconnected',
  EMIT               : 'emit',
  BROADCAST          : 'broadcast',
  SYSTEM_MESSAGE     : 'system_message',
  MESSAGE            : 'message',
  CREATE_ROOM        : 'create_room',
  JOIN_ROOM          : 'join_room',
  LEAVE_ROOM         : 'leave_room',
  GAME_START         : 'game_start',
  GAME_END           : 'game_end',
  GAME_ABORT         : 'game_abort',
  SEND_PLAYER_DETAILS: 'send_player_details',
  SEND_QUESTION      : 'send_question',
  OPPONENT_ANSWERED  : 'opponent_answered'
};