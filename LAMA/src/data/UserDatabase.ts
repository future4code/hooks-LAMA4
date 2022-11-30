import { BaseDatabase } from "../connection/BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {


 protected TABLE_NAME = "table_user";
 public async cadastroUser(products : any) : Promise<void>{
  return await BaseDatabase.connection(this.TABLE_NAME).insert(products)

  // return result[0]

}

  public async getUserByEmail(email: string): Promise<User> {
    const result = await BaseDatabase.connection(this.TABLE_NAME)
      .select("*")
      .where({ email });

    return User.toUserModel(result[0]);
  }

 
}
