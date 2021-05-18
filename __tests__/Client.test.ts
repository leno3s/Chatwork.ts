import { Client, HttpRequestNode, Chatwork, Room } from "../src/index";

const token = "chatwork_token";
const client = new Client(new HttpRequestNode(token));

test("Client#getMe()", () => {
  const me = client.getMe();
  expect(typeof me.title).toBe("string");
  expect(typeof me.url).toBe("string");
  expect(typeof me.introduction).toBe("string");
  expect(typeof me.mail).toBe("string");
  expect(typeof me.tel_organization).toBe("string");
  expect(typeof me.tel_extension).toBe("string");
  expect(typeof me.tel_mobile).toBe("string");
  expect(typeof me.skype).toBe("string");
  expect(typeof me.facebook).toBe("string");
  expect(typeof me.twitter).toBe("string");
  expect(typeof me.login_mail).toBe("string");
});

test("Client#getMyStatus()", () => {
  const status = client.getMyStatus();
  expect(typeof status.mention_num).toBe("number");
  expect(typeof status.mention_room_num).toBe("number");
  expect(typeof status.mytask_num).toBe("number");
  expect(typeof status.mytask_room_num).toBe("number");
  expect(typeof status.unread_num).toBe("number");
  expect(typeof status.unread_room_num).toBe("number");
});

test("Client#getMyTasks()", () => {
  const tasks = client.getMyTasks();
  expect(Array.isArray(tasks)).toBe(true);
});

test("Client#getContacts()", () => {
  const contacts = client.getContacts();
  const contact = contacts[0];
  expect(Array.isArray(contacts)).toBe(true);
  expect(typeof contact.room_id).toBe("number");
  expect(typeof contact.chatwork_id).toBe("string");
  expect(typeof contact.organization_id).toBe("number");
  expect(typeof contact.organization_name).toBe("string");
  expect(typeof contact.department).toBe("string");
});

test("Client#getRooms()", () => {
  const rooms = client.getRooms();
  const room = rooms[0];
  expect(Array.isArray(rooms)).toBe(true);
  expect(rooms.length).toBeGreaterThanOrEqual(0);
  expect(room).toBeInstanceOf(Room);
});

test("Client#getRequestsToContact()", () => {
  const requests = client.getRequestsToContact();
  expect(Array.isArray(requests)).toBe(true);
  expect(requests.length).toBeGreaterThanOrEqual(0);
});
