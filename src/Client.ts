/// <reference path="types/Chatwork/index.d.ts" />

/** 
 * ChatWork API wrapper
 *   公式ドキュメント : http://developer.chatwork.com/ja/
 */
namespace Chatwork {
    export class Client implements Client {

        BASE_URL: string = "https://api.chatwork.com/v2";
        header: { 'X-ChatWorkToken': string };

        private constructor(config: { token: string }) {
            this.header = { 'X-ChatWorkToken': config.token };
        };

        /**
         * インスタンス生成用のメソッド
         *
         * @param token 利用するアカウントのAPIトークン, 下記URLから取得
         * https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php
         * 
         * @returns ChatWorkClientのインスタンス
         */
        public static factory(token: string) {
            return new Client({ token: token });
        }

        private sendRequest(params: { method, path: string, payload: string }) {
            const url = this.BASE_URL + params.path;
            const options = {
                'method': params.method,
                'headers': this.header,
                'payload': params.payload || {}
            };
            const result = UrlFetchApp.fetch(url, options);

            // return response if 200
            if (result.getResponseCode() == 200) {
                return JSON.parse(result.getContentText());
            }
            // failed
            return false;
        }

        private get(endpoint: string, getData) {
            getData = getData || {};
            let path = endpoint;
            let querystringList: Array<string> = [];

            for (let key in getData) {
                querystringList.push(encodeURIComponent(key) + '=' + encodeURIComponent(getData[key]));
            }
            if (querystringList.length > 0) {
                path = '?' + querystringList.join('&');
            }

            return this.sendRequest({
                'method': 'get',
                'path': path,
                'payload': null
            });

        }

        private post(endpoint: string, postData) {
            return this.sendRequest({
                'method': 'post',
                'path': endpoint,
                'payload': postData
            });
        }

        private put(endpoint: string, putData) {
            return this.sendRequest({
                'method': 'put',
                'path': endpoint,
                'payload': putData
            })
        }

        /**
         * 自身の情報を取得
         * http://developer.chatwork.com/ja/endpoint_me.html#GET-me
         */
        public getMe() {
            return this.get('/me', null);
        }

        /**
         * 自分のチャットルーム一覧を取得
         * http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms
         */
        public getRooms() {
            return this.get('/rooms', null);
        }

        /**
         * 指定したチャットルームへメッセージを送信
         * http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-messages
         * 
         * @param roomId    送信する相手のルームID
         * @param message   送信するメッセージ本文
         */
        public sendMessage(roomId: number, message: string) {
            const endpoint = '/rooms/' + roomId + '/messages';
            const postData = { 'body': message };
            return this.post(endpoint, postData);
        }

        /**
         * MyChatへメッセージを送信
         * ChatWorkClient#sendMessage()のroomIdを/me叩いてroomId渡してるだけ
         *
         * @param message 送信するメッセージ本文
         */
        public sendMessageToMyChat(message: string) {
            let myData;
            myData = this.get('/me', null);
            return this.sendMessage(myData.room_id, message);
        }

        /**
         * チャットルームのメンバー一覧を取得
         * http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-members
         * 
         * @param roomId メンバー一覧を取得したいチャットルームのID
         */
        public getRoomMembers(roomId: number) {
            return this.get(`/rooms/${roomId}/members`, null)
        }

        /**
         * チャットルームへ新しいタスクを追加
         * http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-tasks
         * 
         * @param message   送信するメッセージ本文
         * @param roomId    メッセージを送信するチャットルームのID
         * @param limit     タスクの期限, Unix時間で指定(Moment.jsとか使ってね)
         * @param to_ids    担当者のアカウントID
         */
        public sendTask(message: string, roomId: number, limit: number, to_ids: Array<number>) {
            const ids: string = to_ids.toString();
            const postData = {
                'body': message,
                'to_ids': ids,
                'limit': (new Number(limit)).toFixed() // 指数表記で来ることがあるので、intにする
            };
            return this.post('/rooms/' + roomId + '/tasks', postData);
        }

        /**
         * 指定したチャットルームのタスクを全て取得
         * http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-tasks
         * 
         * @param roomId        取得したいチャットルームのID
         * @param account_id    (オプション) タスク担当者のアカウントID
         * @param assignor_id   (オプション) タスク送信者のアカウントID
         * @param status        (オプション) タスクのステータス
         */
        public getRoomTasks(roomId: number, account_id?: number, assignor_id?: number, status?: 'open' | 'done') {
            const param = {};
            if (account_id !== undefined) param['account_id'] = account_id;
            if (assignor_id !== undefined) param['assigned_by_account_id'] = assignor_id;
            if (status !== undefined) param['status'] = status;
            return this.get('/rooms/' + roomId + '/tasks', param);
        }

        /**
         * 自分のタスク一覧を取得
         * http://developer.chatwork.com/ja/endpoint_my.html#GET-my-task 
         * 
         * @param assignor_id   (オプション) タスク送信者のアカウントID
         * @param status        (オプション) タスクのステータス
         */
        public getMyTasks(assignor_id?: number, status?: 'open' | 'done') {
            let param = {};
            if (assignor_id !== undefined) param['assigned_by_account_id'] = assignor_id;
            if (status !== undefined) param['status'] = status;
            return this.get('/my/tasks', param);
        }

    }

}