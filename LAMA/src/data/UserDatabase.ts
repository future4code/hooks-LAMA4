import { BaseDatabase } from "../connection/BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

 protected TABLE_NAME = "table_user"


 public async cadastroUser(user : any) : Promise<number>{
  const result = await BaseDatabase.connection(this.TABLE_NAME).insert(user)

  return result[0]
}

  public async getUserByEmail(email: string): Promise<User> {
    const result = await BaseDatabase.connection(this.TABLE_NAME)
      .select("*")
      .where({ email });

    return User.toUserModel(result[0]);
  }

 
}
