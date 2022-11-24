import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../connection/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";

const  userBusiness = new  UserBusiness(new UserDatabase())
export class UserController {
    constructor(
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

            const token = await userBusiness.getUserByEmail(loginData)
            res.status(200).send({message:"sucess",token})

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}