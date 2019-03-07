interface User {
      account_id: number,
      role: string,
      name: string,
      chatwork_id: string,
      organization_id: number,
      organization_name: string,
      department: string,
      avatar_image_url: string
}

export class ChatworkUser implements User {

    account_id: number;
    role: string;
    room_id: number;
    name: string;
    chatwork_id: string;
    organization_id: number;
    organization_name: string;
    department: string;
    avatar_image_url: string;

    public constructor(user: User) {
        this.account_id = user.account_id;
        this.role = user.role;
        this.name = user.name;
        this.chatwork_id = user.chatwork_id
        this.organization_id = user.organization_id;
        this.organization_name = user.organization_name;
        this.department = user.department;
        this.avatar_image_url = user.avatar_image_url;
    };
}