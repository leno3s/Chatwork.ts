import { Client, HttpRequestNode, Chatwork, Room } from "../src/index";

const token = "chatwork_token";
const client = new Client(new HttpRequestNode(token));
const me = client.getMe();
const room = client.getRoom(me.room_id);
let messageId;

test("Room Properties", () => {
  expect(room).toBeInstanceOf(Room);
  expect(typeof room.room_id).toBe("number");
  expect(typeof room.name).toBe("string");
  expect(typeof room.type).toBe("string");
  expect(typeof room.role).toBe("string");
  expect(typeof room.sticky).toBe("boolean");
  expect(typeof room.unread_num).toBe("number");
  expect(typeof room.mention_num).toBe("number");
  expect(typeof room.mytask_num).toBe("number");
  expect(typeof room.message_num).toBe("number");
  expect(typeof room.file_num).toBe("number");
  expect(typeof room.task_num).toBe("number");
  expect(typeof room.icon_path).toBe("string");
  expect(typeof room.last_update_time).toBe("number");
  expect(typeof room.description).toBe("string");
  expect(typeof room.room_id).toBe("number");
});

test("Room#getRoomInfomation()", () => {
  const info = room.getRoomInfomation();
  expect(info).toBeInstanceOf(Room);
  expect(typeof info.room_id).toBe("number");
  expect(typeof info.name).toBe("string");
  expect(typeof info.type).toBe("string");
  expect(typeof info.role).toBe("string");
  expect(typeof info.sticky).toBe("boolean");
  expect(typeof info.unread_num).toBe("number");
  expect(typeof info.mention_num).toBe("number");
  expect(typeof info.mytask_num).toBe("number");
  expect(typeof info.message_num).toBe("number");
  expect(typeof info.file_num).toBe("number");
  expect(typeof info.task_num).toBe("number");
  expect(typeof info.icon_path).toBe("string");
  expect(typeof info.last_update_time).toBe("number");
  expect(typeof info.description).toBe("string");
  expect(typeof info.room_id).toBe("number");
});

test("Room#getRoomMembers()", () => {
  const members = room.getRoomMembers();
  const member = members[0];
  expect(Array.isArray(members)).toBe(true);
  expect(typeof member.account_id).toBe("number");
  expect(typeof member.avatar_image_url).toBe("string");
  expect(typeof member.chatwork_id).toBe("string");
  expect(typeof member.department).toBe("string");
  expect(typeof member.name).toBe("string");
  expect(typeof member.organization_id).toBe("number");
  expect(typeof member.organization_name).toBe("string");
  expect(typeof member.role).toBe("string");
});

test("Room#getMessages()", () => {
  const messages = room.getMessages(1);
  const message = messages[0];
  messageId = message.message_id;
  expect(Array.isArray(messages)).toBe(true);
  expect(typeof message.account).toBe("object");
  expect(typeof message.body).toBe("string");
  expect(typeof message.message_id).toBe("string");
  expect(typeof message.send_time).toBe("number");
  expect(typeof message.update_time).toBe("number");
});

test("Room#getTasks()", () => {
  const tasks = room.getTasks();
  expect(Array.isArray(tasks)).toBe(true);
});
