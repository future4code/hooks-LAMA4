import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }
    async signup(req: Request, res: Response) {
        
        const {name, email,password,role} = req.body
        try {

            const input: UserInputDTO = {
                email,
                name,
                password,
                role,
            }

            const userBusiness = new UserBusiness(name, email,password,role);
            const token = await userBusiness.createUser(input);

            res.status(201).send({message:"User Createad",token})

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {
            const {email, password} = req.body
            const loginData: LoginInputDTO = {
                email,
                password
            };

            const token = await this.userBusiness.getUserByEmail(loginData)
            res.status(200).send({message:"sucess",token})

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}