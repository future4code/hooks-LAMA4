import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";


const  idGenerator = new IdGenerator()
const  hashManager = new HashManager()
const  authenticator = new Authenticator()

export class UserBusiness {
    constructor(
        private userData: UserDatabase,
    ) {}

    async createUser(user: UserInputDTO) {
        try {
            const { name, password, email, role } = user

        if (!name || !email || !password || !role) {
            throw new BaseError(422, "Invalid fields")

        }

        if (email.indexOf("@") === -1) {
            throw new BaseError(422, "Invalid email");
        }

        if (password.length < 6) {
            throw new BaseError(422, "Invalid password")
        }

        if (role !== "NORMAL" && role !== "ADMIN") {
            throw new BaseError(422, "Invalid user role")
        }

     
        // const registeredUser = await this.userData.getUserByEmail(email)
        // if (registeredUser) {
        //     throw new BaseError(422, "E-mail already registered")
        // }

        const id = idGenerator.generate();
        const hashPassword : any =  hashManager.hash(user.password);

      const user1 = {
        id : id ,name, password, email, role
      }
        await this.userData.cadastroUser(user1);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
        } catch (error : any) {
            console.log(error.message)
        }
        
    }

    async getUserByEmail(user: LoginInputDTO) {

        const { email, password } = user
        if (!email || !password) {
            throw new BaseError(422, "'email' and 'password' are required")
        }

        if (email.indexOf("@") === -1) {
            throw new BaseError(422, "Invalid email");
        }

        if (password.length < 6) {
            throw new BaseError(422, "Invalid password");
        }

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new BaseError(401, "User not found")
        }

     
        const hashCompare = hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}