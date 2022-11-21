import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";

export class UserBusiness {
    constructor(
        private userData: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
    ) { }

    async createUser(user: UserInputDTO) {

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

        const registeredUser = await this.userData.getUserByEmail(email)
        if (registeredUser) {
            throw new BaseError(422, "E-mail already registered")
        }

        const id = this.idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
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

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}