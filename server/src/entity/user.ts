import { Entity , Column , PrimaryGeneratedColumn, BaseEntity, OneToOne ,JoinColumn , Unique, OneToMany } from "typeorm";
import {IsEmail,} from "class-validator"
import { Profile } from "./profile";
import { Addtask } from "./addtask";

@Entity('user')
@Unique(['email'])
export class User extends BaseEntity {
 
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100 , nullable: true})
    uname:string

    @Column({ name: "email"})
    @IsEmail()
    email :string
    
    @Column({nullable: true})
    password:string

    @Column({nullable: true})
    providerId:string

    @Column({nullable: true})
    provider:string

    @Column( { type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    info : string

    @OneToMany(() => Addtask ,(addtask)=>addtask.user)
    addtask: Addtask[]

    @OneToOne(()=>Profile , {cascade:true})
    @JoinColumn()
    profile:Profile

} 
