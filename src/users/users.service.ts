import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma.service'


export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    private readonly users = [
        { username: 'testuser', password: 'testpassword', email: 'testuser@example.com' },
      ];
    
      async findOne(username: string): Promise<any | undefined> {
        return this.users.find(user => user.username === username);
      }
    async create(user: any) {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(user.password, salt)
        const newUser = await this.prisma.user.create({
            data: {
                ...user,
                password: hash
            }
        })
        return newUser
    }


    async validateUser(email: string, pass: string) {
        const user = await this.findOne(email)
        if(user && await bcrypt.compare(pass, user.password)) {
            const {password, ...result} = user
            return result
        }
        return null
    }
}
