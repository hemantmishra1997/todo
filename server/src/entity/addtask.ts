import { Entity, PrimaryGeneratedColumn, Column , ManyToOne, JoinColumn} from "typeorm"
import { User } from "./user"

@Entity()
export class Addtask {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    task: string

    @Column()
    date: string

    @Column()
    end_date:string

    @Column()
    state: string

    @Column()
    info:string

   @ManyToOne(()=> User,(user)=>user.addtask)
   @JoinColumn({})
   user:User

    // @OneToOne(()=>Profile , {cascade:true})
    // @JoinColumn()
    // profile:Profile

}