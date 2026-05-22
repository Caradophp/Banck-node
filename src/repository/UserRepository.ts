import { EntityManager } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager;

    constructor(
        manager = AppDataSource.manager
    ) {
        this.manager = manager; 
    }

    createUser = async (user: User) => {
        return this.manager.save(user)
    }

    getUser = async (userId: string) => {
        return this.manager.findOne(User, {
            where: {
                user_id: userId
            }
        })
    }

    getUserByEmailAndPassword =  async (email: string, password: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email: email,
                password: password
            }
        })
    }

    getUserCompleteInfos =  async (id: string): Promise<User | null> => {
        return this.manager.query(`
            SELECT 
                * 
            FROM 
                users u
            JOIN contas c ON u.user_id = c.user_id
            WHERE u.user_id = ?`, [id])
    }
}